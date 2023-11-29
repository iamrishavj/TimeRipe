import { createStore } from "solid-js/store";
import TaskList from "./components/TaskList";

import { Task, TaskPlanner } from "./types/Task";

import { priorityMap } from "./utils/priorityConfig";

import { dummyTasks } from "./data/sampleTasks";

function App() {
  const [tasks, setTasks] = createStore<TaskPlanner>(dummyTasks);

  function CustomOrderingForActiveQueue(task: Task) {
    setTasks(
      "Active",
      [...tasks["Active"], { ...task, priority: task.priority }].sort(
        (a, b) => priorityMap[a.priority] - priorityMap[b.priority]
      )
    );
  }

  const handleAddTask = (task: Task, status: keyof TaskPlanner) => {
    if (status === "Active") {
      CustomOrderingForActiveQueue(task);
    } else setTasks(status, [...tasks[status], task]);

    // Todo: Store the added tasks
  };

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
        CustomOrderingForActiveQueue(taskToUpdate);
      } else {
        setTasks(newStatus, [...tasks[newStatus], { ...taskToUpdate }]);
      }
    }

    // Todo: Store the updated tasks
  };

  return (
    <div class="flex flex-col h-screen overflow-hidden">
      <div class="flex-none" style="height: 33.333%;">
        {/* Timer or other content here */}
        {/* Timer Component */}
      </div>
      <div class="flex-1 flex overflow-hidden gap-1">
        <div class="md:w-1/4 overflow-auto hidden md:block rounded-t-xl">
          <TaskList
            ListType="Todo"
            tasks={tasks["Todo"]}
            updateTasks={updateTasks}
            handleAddTask={handleAddTask}
          />
        </div>
        <div class="w-full md:w-1/2 overflow-auto rounded-t-xl">
          <TaskList
            ListType="Active"
            tasks={tasks["Active"]}
            updateTasks={updateTasks}
            handleAddTask={handleAddTask}
          />
        </div>
        <div class="md:w-1/4 overflow-auto hidden md:block rounded-t-xl">
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
