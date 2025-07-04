import { motion } from "framer-motion";
import { FaTrash, FaCheck } from "react-icons/fa";

export default function TaskItem({ task, onComplete, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      layout
      className="flex items-center justify-between p-2 bg-white shadow rounded mb-2"
    >
      <span className={`flex-1 ${task.done ? "line-through text-gray-400" : ""}`}>
        {task.text}
      </span>

      <div className="flex gap-2">
        <button
          onClick={() => onComplete(task.id)}
          className="text-green-600 hover:text-green-800"
        >
          <FaCheck />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 hover:text-red-800"
        >
          <FaTrash />
        </button>
      </div>
    </motion.div>
  );
}
