// import { createSignal } from 'solid-js';
import { dummyTasks } from "./data/sampleTasks";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div class="flex flex-col h-screen overflow-hidden">
      <div class="flex-none" style="height: 33.333%;">
        {/* Timer or other content here */}
        {/* Timer Component */}
      </div>
      <div class="flex-1 flex overflow-hidden">
        <div class="md:w-1/4 overflow-auto hidden md:block">
          <TaskList ListType="Todo" tasks={dummyTasks} />
        </div>
        <div class="w-full md:w-1/2 overflow-auto">
          <TaskList ListType="Active" tasks={dummyTasks} />
        </div>
        <div class="md:w-1/4 overflow-auto hidden md:block">
          <TaskList ListType="Finished" tasks={dummyTasks} />
        </div>
      </div>
    </div>
  );
}

export default App;
