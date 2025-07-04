import React, { useState } from "react";
import { categories } from "../utils/categories";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState(categories[0]);

  // Handles new task form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      priority,
      dueDate,
      category,
    };

    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    setCategory(categories[0]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border p-6 rounded-2xl shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-gray-900 dark:text-gray-100"
    >
      <input
        type="text"
        value={title}
        placeholder="Task Title"
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 transition"
      />

      <textarea
        value={description}
        placeholder="Task Description (optional)"
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 transition"
        rows={3}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 transition"
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 transition"
      />

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 transition"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white font-semibold shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
      >
        Add Task
      </button>
    </form>
  );
}
