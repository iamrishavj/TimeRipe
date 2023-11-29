// import { createSignal } from 'solid-js';
import { dummyTasks } from "./data/sampleTasks";
import TaskList from "./components/TaskList";
import { createStore } from "solid-js/store";
import { Task, TaskPlanner } from "./types/Task";
import { priorityMap } from "./utils/priorityConfig";

function App() {
  const [tasks, setTasks] = createStore<TaskPlanner>(dummyTasks);

  const updateTasks = (taskId: string, newStatus: keyof TaskPlanner) => {
    // Find the task and its current status
    let currentStatus: keyof TaskPlanner | undefined;
    let taskToUpdate: Task | undefined;
    for (const status of Object.keys(tasks) as (keyof TaskPlanner)[]) {
      taskToUpdate = tasks[status].find((t) => t.id === taskId);
      if (taskToUpdate) {
        currentStatus = status;
        break;
      }
    }

    if (currentStatus && taskToUpdate && currentStatus !== newStatus) {
      // Remove the task from its current status array
      setTasks(
        currentStatus,
        tasks[currentStatus].filter((t) => t.id !== taskId)
      );

      // Add the task to the new status array and sort if necessary
      if (newStatus === "Active") {
        setTasks(
          newStatus,
          [
            ...tasks[newStatus],
            { ...taskToUpdate, priority: taskToUpdate.priority },
          ].sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority])
        );
      } else {
        setTasks(newStatus, [...tasks[newStatus], { ...taskToUpdate }]);
      }
    }

    // Update localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  return (
    <div class="flex flex-col h-screen overflow-hidden">
      <div class="flex-none" style="height: 33.333%;">
        {/* Timer or other content here */}
        {/* Timer Component */}
      </div>
      <div class="flex-1 flex overflow-hidden">
        <div class="md:w-1/4 overflow-auto hidden md:block">
          <TaskList
            ListType="Todo"
            tasks={tasks["Todo"]}
            updateTasks={updateTasks}
          />
        </div>
        <div class="w-full md:w-1/2 overflow-auto">
          <TaskList
            ListType="Active"
            tasks={tasks["Active"]}
            updateTasks={updateTasks}
          />
        </div>
        <div class="md:w-1/4 overflow-auto hidden md:block">
          <TaskList
            ListType="Finished"
            tasks={tasks["Finished"]}
            updateTasks={updateTasks}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
