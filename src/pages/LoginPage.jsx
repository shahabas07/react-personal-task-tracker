import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Handles login form submission and navigation
  function handleSubmit(e) {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("username", username);
      navigate("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="w-full max-w-md mx-auto p-8 rounded-2xl shadow-xl bg-white/80 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col items-center mb-6">
          <span className="text-4xl mb-2">📝</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Welcome to Personal Task Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
            Organize your tasks efficiently and stay productive.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white font-semibold shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
