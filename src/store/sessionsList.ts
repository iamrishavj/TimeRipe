import { createStore } from "solid-js/store";
import { Session } from "../types/Session";

const [sessionList, setSessionList] = createStore<Session[]>([]);

export { sessionList, setSessionList };
