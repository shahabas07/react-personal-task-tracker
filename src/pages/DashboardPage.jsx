import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { saveTasks, loadTasks } from "../utils/taskStorage";

export default function DashboardPage() {
  const [username, setUsername] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (!storedUser) {
      navigate("/");
    } else {
      setUsername(storedUser);
    }
    setTasks(loadTasks());
  }, [navigate]);

  const handleAddTask = (task) => {
    const updatedTasks = [task, ...tasks];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Welcome, {username}</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}
