import { createStore } from "solid-js/store";
import { TaskPlanner } from "../types/Task";

const [tasks, setTasks] = createStore<
  TaskPlanner & {
    sessionId?: number;
  }
>(JSON.parse(localStorage.getItem("tasks") || "[]"));

function setCurrentSession(sessionId: number) {
  setTasks("sessionId", sessionId);
}

function currentSessionId() {
  return tasks.sessionId;
}

export { tasks, setTasks, setCurrentSession, currentSessionId };
