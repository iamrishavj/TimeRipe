import TaskManager from "./components/TaskManager";

function App() {
  return (
    <div class="flex flex-col h-screen overflow-hidden">
      <div class="flex-none" style="height: 33.333%;">
        {/* Timer or other content here */}
        {/* Timer Component */}
      </div>
      <div class="flex-1 flex overflow-hidden gap-1">
        <TaskManager />
      </div>
    </div>
  );
}

export default App;
