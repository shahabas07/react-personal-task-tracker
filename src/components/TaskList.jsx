import React from "react";
import TaskItem from "./TaskItem";
import { AnimatePresence, motion } from "framer-motion";

// Renders the list of tasks with animation
export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400">No tasks found.</p>;
  }

  return (
    <ul className="space-y-3">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <TaskItem
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
