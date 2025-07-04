import { useEffect, useState } from "react";
import { useSession } from "../../context/SessionItem";
import { AnimatePresence } from "framer-motion";
import NewTaskForm from "./NewTaskForm";
import TaskItem from "./TaskItem";

const STORAGE_KEY = "pomotask-list";

export default function TaskList() {
  const { sessionId } = useSession();
  const [allTasks, setAllTasks] = useState([]);

  const currentTasks = allTasks.filter((t) => t.sessionId === sessionId);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setAllTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allTasks));
  }, [allTasks]);

  const addTask = (text) => {
    const newTask = {
      id: crypto.randomUUID(),
      text,
      done: false,
      sessionId,
    };
    setAllTasks([newTask, ...allTasks]);
  };

  const toggleComplete = (id) => {
    setAllTasks(
      allTasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTask = (id) => {
    setAllTasks(allTasks.filter((t) => t.id !== id));
  };

  return (
    <div className="mt-8 max-w-md w-full">
      <h3 className="text-xl font-semibold mb-2">Tareas de esta sesión</h3>
      <NewTaskForm onAdd={addTask} />
      <div className="mt-4">
        <AnimatePresence>
          {currentTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={toggleComplete}
              onDelete={deleteTask}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
