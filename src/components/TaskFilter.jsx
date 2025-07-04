import React from "react";
import { categories } from "../utils/categories";

// Renders filter buttons, search, and category dropdown
export default function TaskFilter({
  filter,
  setFilter,
  search,
  setSearch,
  counts,
  categoryFilter,
  setCategoryFilter,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md p-4 rounded-xl shadow border border-gray-200 dark:border-gray-800">
      <div className="flex space-x-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded font-semibold transition ${
            filter === "all"
              ? "bg-gradient-to-r from-blue-500 via-purple-100 to-pink-500 text-white shadow"
              : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          }`}
        >
          All ({counts.all})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded font-semibold transition ${
            filter === "completed"
              ? "bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 text-white shadow"
              : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          }`}
        >
          Completed ({counts.completed})
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-3 py-1 rounded font-semibold transition ${
            filter === "pending"
              ? "bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 text-white shadow"
              : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          }`}
        >
          Pending ({counts.pending})
        </button>
      </div>

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border border-gray-300 dark:border-gray-700 rounded w-full sm:w-64 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 transition"
      />

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="p-2 border border-gray-300 dark:border-gray-700 rounded w-full sm:w-48 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 transition"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
