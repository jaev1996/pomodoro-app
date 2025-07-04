import PomodoroTimer from "../components/Timer/PomodoroTimer";
import TaskList from "../components/Tasks/TaskList";
import HistoryList from "../components/History/HistoryList";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <PomodoroTimer />
            <TaskList />
            <HistoryList />
        </div>
    );
}
