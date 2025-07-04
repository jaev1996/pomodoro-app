import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SessionItem({ session, tasks }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 border rounded-md shadow bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-2 bg-gray-100 font-semibold hover:bg-gray-200"
      >
        Sesión del {new Date(+session).toLocaleString()}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-2"
          >
            {tasks.map((t) => (
              <div
                key={t.id}
                className={`text-sm py-1 ${t.done ? "line-through text-gray-500" : ""}`}
              >
                • {t.text}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
