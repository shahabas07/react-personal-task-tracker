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

    const handleToggleComplete = (taskId) => {
        const updated = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updated);
        saveTasks(updated);
    };

    const handleDeleteTask = (taskId) => {
        const updated = tasks.filter((task) => task.id !== taskId);
        setTasks(updated);
        saveTasks(updated);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Welcome, {username}</h1>
            <TaskForm onAddTask={handleAddTask} />
            <TaskList
                tasks={tasks}
                onToggle={handleToggleComplete}
                onDelete={handleDeleteTask}
            />
        </div>
    );
}
