import { createStore } from "solid-js/store";
import { TaskPlanner } from "../types/Task";

const [tasks, setTasks] = createStore<TaskPlanner>(
  JSON.parse(localStorage.getItem("tasks") || "[]")
);

export { tasks, setTasks };
