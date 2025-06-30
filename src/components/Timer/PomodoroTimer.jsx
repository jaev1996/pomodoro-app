import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const WORK_TIME = 0.2 * 60; // 25 min en segundos
const BREAK_TIME = 5 * 60; // 5 min en segundos

export default function PomodoroTimer() {
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [timeLeft, setTimeLeft] = useState(WORK_TIME);
    const timerRef = useRef(null);

    // Formato mm:ss
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const handleFinish = useCallback(() => {
        setIsRunning(false);
        setIsBreak((prev) => !prev);
        setTimeLeft(isBreak ? WORK_TIME : BREAK_TIME);

        // Puedes reproducir un sonido aquí o mostrar una notificación visual
        // new Audio('/path/to/sound.mp3').play();
        // alert('¡Tiempo terminado!');
    }, [isBreak]);

    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        handleFinish();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [isRunning, handleFinish]);

    const handleStartPause = () => setIsRunning((prev) => !prev);
    const handleReset = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
        setTimeLeft(isBreak ? BREAK_TIME : WORK_TIME);
    };

    return (
        <div className="text-center mt-8">
            <h2 className="text-2xl font-semibold mb-4">
                {isBreak ? "Break Time 🧘" : "Work Time 💻"}
            </h2>

            <motion.div
                key={timeLeft}
                initial={{ opacity: 0.4, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-6xl font-mono mb-6"
            >
                {formatTime(timeLeft)}
            </motion.div>

            <div className="space-x-4">
                <button
                    onClick={handleStartPause}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
                >
                    {isRunning ? "Pausar" : "Iniciar"}
                </button>
                <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl shadow hover:bg-gray-400"
                >
                    Reiniciar
                </button>
            </div>
        </div>
    );
}
