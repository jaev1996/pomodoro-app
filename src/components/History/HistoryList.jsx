import { useEffect, useState } from "react";
import SessionItem from "./SessionItem";

const STORAGE_KEY = "pomotask-list";

export default function HistoryList() {
  const [grouped, setGrouped] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const tasks = JSON.parse(saved);

    // Agrupar por sessionId
    const groupedTasks = tasks.reduce((acc, task) => {
      const sid = task.sessionId;
      acc[sid] = acc[sid] ? [...acc[sid], task] : [task];
      return acc;
    }, {});

    // Convertir a array y ordenar por fecha
    const sorted = Object.entries(groupedTasks)
      .sort((a, b) => b[0].localeCompare(a[0])) // Más reciente primero
      .slice(0, 10); // Limitar a 10 sesiones

    setGrouped(sorted);
  }, []);

  return (
    <div className="max-w-md w-full mt-12">
      <h3 className="text-xl font-semibold mb-4">Historial de sesiones</h3>
      {grouped.map(([sessionId, tasks]) => (
        <SessionItem key={sessionId} session={sessionId.split("-")[0]} tasks={tasks} />
      ))}
    </div>
  );
}
