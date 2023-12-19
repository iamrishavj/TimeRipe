import { createStore } from "solid-js/store";
import { TaskPlanner } from "../types/Task";
import { user } from "./user";

if (user.isLoggedIn) {
}

const [tasks, setTasks] = createStore<
  TaskPlanner & {
    sessionId?: number;
  }
>(JSON.parse(localStorage.getItem("tasks") || "[]"));

export { tasks, setTasks };
