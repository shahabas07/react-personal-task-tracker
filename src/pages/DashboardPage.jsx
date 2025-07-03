import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import { saveTasks, loadTasks } from "../utils/taskStorage";

export default function DashboardPage() {
  const [username, setUsername] = useState(null);
  const [tasks, setTasks] = useState(() => loadTasks());
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (!storedUser) {
      navigate("/");
    } else {
      setUsername(storedUser);
    }
  }, [navigate]);

  // Sync tasks state to localStorage whenever tasks change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Clear search input when filter changes (optional UX improvement)
  useEffect(() => {
    setSearch("");
  }, [filter]);

  const handleAddTask = (task) => setTasks((prev) => [task, ...prev]);

  const handleToggleComplete = (taskId) =>
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

  const handleDeleteTask = (taskId) =>
    setTasks((prev) => prev.filter((task) => task.id !== taskId));

  const handleEditTask = (taskId, updatedTask) =>
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? updatedTask : task))
    );

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const searchedTasks = filteredTasks.filter((task) => {
    const text = (task.title + " " + (task.description || "")).toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const counts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  // Render null or loader while username is loading to avoid flicker
  if (username === null) {
    return null; // or a spinner component if you want
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Welcome, {username}</h1>

      <TaskForm onAddTask={handleAddTask} />

      <TaskFilter
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        counts={counts}
      />

      <TaskList
        tasks={searchedTasks}
        onToggle={handleToggleComplete}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </div>
  );
}
