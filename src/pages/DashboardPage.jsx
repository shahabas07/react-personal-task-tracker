import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import { saveTasks, loadTasks } from "../utils/taskStorage";

export default function DashboardPage() {
    const [username, setUsername] = useState(null);
    const [tasks, setTasks] = useState([]);
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

    const handleEditTask = (taskId, updatedTask) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? updatedTask : task
        );
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

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
