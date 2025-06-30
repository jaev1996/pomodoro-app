import PomodoroTimer from "../components/Timer/PomodoroTimer";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <PomodoroTimer />
        </div>
    );
}
