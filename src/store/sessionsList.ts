import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { user } from "./user";
import { getAllSessions } from "../data-access/SessionAccess";
import { Session } from "../types/Session";

createEffect(() => {
  if (user.isLoggedIn && user.token) {
    // Get the list of sessions
    console.log("Getting sessions");
    getAllSessions(user.token).then((data) => {
      console.log(data);
      setSessionList(data);
    });
  }
});

const [sessionList, setSessionList] = createStore<Session[]>([]);

export { sessionList, setSessionList };
