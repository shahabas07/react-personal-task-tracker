import React, { useState } from "react";
import { categoryColors } from "../utils/categories";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || "");
  const [editPriority, setEditPriority] = useState(task.priority || "medium");
  const [editDueDate, setEditDueDate] = useState(task.dueDate || "");

  // Saves edited task details
  const handleSave = () => {
    if (!editTitle.trim()) return alert("Title cannot be empty");
    onEdit(task.id, {
      ...task,
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority,
      dueDate: editDueDate,
    });
    setIsEditing(false);
  };

  // Cancels editing and resets fields
  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditPriority(task.priority || "medium");
    setEditDueDate(task.dueDate || "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="border p-4 rounded-xl shadow bg-white/80 dark:bg-gray-900/80 backdrop-blur-md space-y-3">
        <input
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Task Title"
        />
        <textarea
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Task Description"
          rows={3}
        />
        <select
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={editPriority}
          onChange={(e) => setEditPriority(e.target.value)}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <input
          type="date"
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={editDueDate}
          onChange={(e) => setEditDueDate(e.target.value)}
        />

        <div className="flex space-x-3">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded hover:from-green-500 hover:to-green-700 transition"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li
      className={`flex flex-col sm:flex-row sm:items-center justify-between border p-4 rounded-xl shadow bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-gray-900 dark:text-gray-100 transition ${
        task.completed ? "opacity-60 bg-gray-100 dark:bg-gray-800 " : ""
      } hover:shadow-lg`}
    >
      <div className="flex-1 space-y-1">
        <h3
          className={`font-semibold text-lg ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </h3>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded bg-gradient-to-r ${
            task.priority === "high"
              ? "from-red-100 to-red-200 text-black"
              : task.priority === "medium"
              ? "from-yellow-100 to-yellow-200 text-black"
              : "from-green-100 to-green-200 text-black"
          }`}
        >
          {task.priority}
        </span>
        {task.category && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${categoryColors[task.category] || "bg-gray-400 text-white"} ml-2`}
          >
            {task.category}
          </span>
        )}

        {task.description && (
          <p className="text-sm ml-2 mt-4 text-gray-600 dark:text-gray-300">{task.description}</p>
        )}
        <p className="text-xs mt-5 text-gray-400 dark:text-gray-500">
          Created: {new Date(task.createdAt).toLocaleString()}
        </p>
        {task.dueDate && (
          <p className="text-xs text-gray-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm">{task.completed ? "Completed" : "Pending"}</span>
          <button
            onClick={() => onToggle(task.id)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              task.completed
                ? "bg-gradient-to-r from-blue-500 to-green-400"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
            aria-pressed={task.completed}
            type="button"
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                task.completed ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="text-sm px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded hover:from-yellow-500 hover:to-yellow-700 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-sm px-3 py-1 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded hover:from-red-500 hover:to-pink-600 transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
