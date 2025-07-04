import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useSession } from "../../context/SessionItem";

const WORK_TIME = 3 //0.2 * 60; // 25 min en segundos
const BREAK_TIME = 3 //5 * 60; // 5 min en segundos

export default function PomodoroTimer() {
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [timeLeft, setTimeLeft] = useState(WORK_TIME);
    const timerRef = useRef(null);
    const audio = useRef(null);
    const { startNewSession } = useSession();

    useEffect(() => {
        audio.current = new Audio("/sounds/alert.mp3");
    }, []);

    // Formato mm:ss
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const handleFinish = useCallback(() => {
        if (!isBreak) {
            // Termina work time: inicia break automáticamente
            setIsBreak(true);
            setTimeLeft(BREAK_TIME);
            setIsRunning(true);
        } else {
            // Termina break time: vuelve a work pero NO inicia automáticamente
            setIsBreak(false);
            setTimeLeft(WORK_TIME);
            setIsRunning(false);
        }

        // 🔔 Reproducir sonido
        if (audio.current) {
            audio.current.currentTime = 0;
            audio.current.play().catch((e) => console.warn("Error al reproducir sonido", e));
        }

        startNewSession();
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
