// export default function TaskList({ tasks }) {
//   if (tasks.length === 0) {
//     return <p className="text-gray-500">No tasks yet.</p>;
//   }

//   return (
//     <ul className="space-y-4">
//       {tasks.map((task) => (
//         <li
//           key={task.id}
//           className="border p-4 rounded shadow-sm bg-white"
//         >
//           <h3 className="font-semibold">{task.title}</h3>
//           {task.description && <p className="text-gray-700">{task.description}</p>}
//           <p className="text-sm text-gray-400">
//             Created: {new Date(task.createdAt).toLocaleString()}
//           </p>
//         </li>
//       ))}
//     </ul>
//   );
// }

import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
