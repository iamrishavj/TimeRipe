import { setTasks } from "../../store/tasks";

import TaskList from "./TaskList";

import { Task, TaskPlanner } from "../../types/Task";
import { priorityMap } from "../../config/taskPriorityConfig";

import { dummyTasks } from "../../../sample-data/sampleTasks";

export default function TaskManager() {
  setTasks(dummyTasks);

  //Order the stored tasks in the Active queue for the first time
  CustomOrderingForActiveQueue();
  return (
    <>
      <div class="md:w-1/4 overflow-auto hidden md:block rounded-tr-xl">
        <TaskList
          ListType="Todo"
          updateTasks={updateTasks}
          handleAddTask={handleAddTask}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
          handleClearTasks={() => handleClearTasks("Todo")}
        />
      </div>
      <div class="w-full md:w-1/2 overflow-auto rounded-t-xl">
        <TaskList
          ListType="Active"
          updateTasks={updateTasks}
          handleAddTask={handleAddTask}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
          handleClearTasks={() => handleClearTasks("Active")}
        />
      </div>
      <div class="md:w-1/4 overflow-auto hidden md:block rounded-tl-xl">
        <TaskList
          ListType="Finished"
          updateTasks={updateTasks}
          handleDeleteTask={handleDeleteTask}
          handleClearTasks={() => handleClearTasks("Finished")}
        />
      </div>
    </>
  );
}
function CustomOrderingForActiveQueue() {
  setTasks((prevTasks) => {
    return {
      ...prevTasks,
      Active: [...prevTasks.Active].sort(
        (a, b) => priorityMap[a.priority] - priorityMap[b.priority]
      ),
    };
  });
}

const handleAddTask = (task: Task, status: keyof TaskPlanner) => {
  setTasks((prevTasks) => ({
    ...prevTasks,
    [status]: [...prevTasks[status], task],
  }));

  if (status === "Active") CustomOrderingForActiveQueue();

  // Todo: Store the added tasks
};

const handleEditTask = (task: Task, status: keyof TaskPlanner) => {
  setTasks((prevTasks) => ({
    ...prevTasks,
    [status]: prevTasks[status].map((t) => (t.id === task.id ? task : t)),
  }));

  if (status === "Active") CustomOrderingForActiveQueue();
};

const handleDeleteTask = (task: Task, status: keyof TaskPlanner) => {
  setTasks((prevTasks) => ({
    ...prevTasks,
    [status]: prevTasks[status].filter((t) => t.id !== task.id),
  }));
};

const updateTasks = (
  taskId: number,
  currentStatus: keyof TaskPlanner,
  newStatus: keyof TaskPlanner
) => {
  if (currentStatus === newStatus) return;
  setTasks((prevTasks) => {
    const taskToUpdate = prevTasks[currentStatus].find((t) => t.id === taskId);
    if (taskToUpdate) {
      return {
        ...prevTasks,
        [currentStatus]: prevTasks[currentStatus].filter(
          (t) => t.id !== taskId
        ),
        [newStatus]: [...prevTasks[newStatus], { ...taskToUpdate }],
      };
    }
    return prevTasks;
  });

  if (newStatus === "Active") CustomOrderingForActiveQueue();
};

function handleClearTasks(ListType: keyof TaskPlanner) {
  setTasks((prevTasks) => ({
    ...prevTasks,
    [ListType]: [],
  }));
}
