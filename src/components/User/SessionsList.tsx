import { For } from "solid-js";
import { getSessionTasks } from "../../data-access/SessionAccess";
import { sessionList } from "../../store/sessionsList";
import { setCurrentSession, setTasks } from "../../store/tasks";
import { user } from "../../store/user";
import { transformTasks } from "../../utils/helper";

export default function SessionList(props: { onClose: () => void }) {
  return (
    <ul class="w-full">
      <For each={sessionList}>
        {(session) => (
          <li class="flex items-center justify-between px-6 py-4 border-b hover:scale-x-105 transition-all ease-in-out duration-100 hover:font-extrabold">
            <button
              class="text-base font-medium"
              onClick={() => {
                handleSessionClick(session.session_id);
                props.onClose();
              }}
            >
              {session.title}
            </button>
          </li>
        )}
      </For>
    </ul>
  );
}

async function handleSessionClick(session_id: number) {
  if (!user.token) throw new Error("User is not logged in");

  console.log("Session clicked: ", session_id);

  const allSessiontasks = await getSessionTasks(user.token, session_id);

  setTasks(transformTasks(allSessiontasks));
  setCurrentSession(session_id);
}
