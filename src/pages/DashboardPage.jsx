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
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showModal, setShowModal] = useState(false); // Modal state
  const navigate = useNavigate();

  // Navigates to login if no username found
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (!storedUser) {
      navigate("/");
    } else {
      setUsername(storedUser);
    }
  }, [navigate]);

  // Saves tasks to localStorage whenever tasks change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Resets search when filter or category changes
  useEffect(() => {
    setSearch("");
  }, [filter, categoryFilter]);

  // Adds a new task and closes the modal
  const handleAddTask = (task) => {
    setTasks((prev) => [task, ...prev]);
    setShowModal(false);
  };

  // Toggles a task's completed state
  const handleToggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Deletes a task by id
  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // Edits a task by id
  const handleEditTask = (taskId, updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? updatedTask : task))
    );
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .filter((task) => {
      if (categoryFilter === "all") return true;
      return task.category === categoryFilter;
    });

  const searchedTasks = filteredTasks.filter((task) =>
    (task.title + " " + (task.description || ""))
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const counts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  if (username === null) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <header className="w-full py-6 px-4 flex justify-between items-center bg-white/80 dark:bg-gray-900/80 shadow-md backdrop-blur-md">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Welcome, {username}
        </h1>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto p-4 space-y-6">
        <TaskFilter
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          counts={counts}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />

        <TaskList
          tasks={searchedTasks}
          onToggle={handleToggleComplete}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </main>

      <button
        onClick={() => setShowModal(true)}
        className="fixed  sm:bottom-20 bottom-6 left-8 sm:left-1/2 sm:-translate-x-1/2 z-50 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-pink-300"
        aria-label="Add Task"
      >
        +
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 text-2xl font-bold focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Add New Task
            </h2>
            <TaskForm onAddTask={handleAddTask} />
          </div>
        </div>
      )}

      <footer className="w-full py-4 px-4 mt-8 bg-white/80 dark:bg-gray-900/80 text-center text-gray-500 dark:text-gray-400 text-sm shadow-inner backdrop-blur-md">
        &copy; {new Date().getFullYear()} Personal Task Tracker &mdash; Stay
        productive!
      </footer>
    </div>
  );
}
