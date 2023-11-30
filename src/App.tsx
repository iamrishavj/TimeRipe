import { createStore } from "solid-js/store";

import TaskList from "./components/TaskList";

import { Task, TaskPlanner } from "./types/Task";
import { priorityMap } from "./utils/priorityConfig";

import { dummyTasks } from "./data/sampleTasks";

function App() {
  const [tasks, setTasks] = createStore<TaskPlanner>(dummyTasks);

  function CustomOrderingForActiveQueue() {
    setTasks(
      "Active",
      [...tasks["Active"]].sort(
        (a, b) => priorityMap[a.priority] - priorityMap[b.priority]
      )
    );
  }

  const handleAddTask = (task: Task, status: keyof TaskPlanner) => {
    setTasks(status, [...tasks[status], task]);

    if (status === "Active") CustomOrderingForActiveQueue();

    // Todo: Store the added tasks
  };

  const handleEditTask = (task: Task, status: keyof TaskPlanner) => {
    setTasks(
      status,
      tasks[status].map((t) => (t.id === task.id ? task : t))
    );
    if (status === "Active") CustomOrderingForActiveQueue();
  };

  const handleDeleteTask = (task: Task, status: keyof TaskPlanner) => {
    setTasks(
      status,
      tasks[status].filter((t) => t.id !== task.id)
    );
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

      // Add the task to the new status array and re-order the active queue

      setTasks(newStatus, [...tasks[newStatus], { ...taskToUpdate }]);
      if (newStatus === "Active") CustomOrderingForActiveQueue();
    }

    // Todo: Store the updated tasks
  };

  //Order the stored tasks in the Active queue for the first time
  CustomOrderingForActiveQueue();

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
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
          />
        </div>
        <div class="w-full md:w-1/2 overflow-auto rounded-t-xl">
          <TaskList
            ListType="Active"
            tasks={tasks["Active"]}
            updateTasks={updateTasks}
            handleAddTask={handleAddTask}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
          />
        </div>
        <div class="md:w-1/4 overflow-auto hidden md:block rounded-t-xl">
          <TaskList
            ListType="Finished"
            tasks={tasks["Finished"]}
            updateTasks={updateTasks}
            handleDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
