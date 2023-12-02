import PomodoroTimer from "./components/Timer/PomodoroTimer";
import TaskManager from "./components/TaskManager/TaskManager";

function App() {
  return (
    <div class="flex flex-col h-screen overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600">
      <div class="flex-none" style="height: 33.333%;">
        <PomodoroTimer />
      </div>
      <div class="flex-1 flex overflow-hidden gap-1">
        <TaskManager />
      </div>
    </div>
  );
}

export default App;
