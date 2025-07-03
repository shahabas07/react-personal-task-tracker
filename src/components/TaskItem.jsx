import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete }) {
  const [confirming, setConfirming] = useState(false);

  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleDelete = () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 2000); // reset after 2s
      return;
    }
    onDelete(task.id);
  };

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
            onChange={handleToggle}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-sm">
            {task.completed ? "Completed" : "Pending"}
          </span>
        </label>
        <button
          onClick={handleDelete}
          className={`text-sm px-3 py-1 rounded ${
            confirming
              ? "bg-red-600 text-white"
              : "bg-red-100 text-red-600 hover:bg-red-200"
          }`}
        >
          {confirming ? "Confirm?" : "Delete"}
        </button>
      </div>
    </li>
  );
}
