import React, { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || "");

  const handleSave = () => {
    if (!editTitle.trim()) return alert("Title cannot be empty");
    onEdit(task.id, {
      ...task,
      title: editTitle.trim(),
      description: editDescription.trim(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="border p-4 rounded shadow-sm bg-white space-y-3">
        <input
          className="w-full p-2 border rounded"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Task Title"
        />
        <textarea
          className="w-full p-2 border rounded"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Task Description"
          rows={3}
        />
        <div className="flex space-x-3">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li
      className={`flex flex-col sm:flex-row sm:items-center justify-between border p-4 rounded shadow-sm transition bg-white ${
        task.completed ? "opacity-60 bg-gray-100 line-through" : ""
      }`}
    >
      <div className="flex-1 space-y-1">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-gray-600">{task.description}</p>
        )}
        <p className="text-xs text-gray-400">
          Created: {new Date(task.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center space-x-3">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-sm">
            {task.completed ? "Completed" : "Pending"}
          </span>
        </label>
        <button
          onClick={() => setIsEditing(true)}
          className="text-sm px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
