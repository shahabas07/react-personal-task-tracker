import { useState, useEffect } from "react";

export default function TaskFilter({ filter, setFilter, search, setSearch, counts }) {
  const [searchInput, setSearchInput] = useState(search);

  // Debounce search input (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchInput, setSearch]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
      <div className="flex space-x-3">
        {["All", "Completed", "Pending"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status.toLowerCase())}
            className={`px-4 py-2 rounded ${
              filter === status.toLowerCase()
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status} ({counts[status.toLowerCase()] || 0})
          </button>
        ))}
      </div>
      <input
        type="search"
        placeholder="Search tasks..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="border rounded px-3 py-2 w-full sm:w-64"
      />
    </div>
  );
}
