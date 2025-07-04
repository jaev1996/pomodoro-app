import { useState } from "react";

export default function NewTaskForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      onAdd(trimmed);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe una tarea..."
        className="flex-1 p-2 rounded-md border border-gray-300"
      />
      <button
        type="submit"
        className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Agregar
      </button>
    </form>
  );
}
