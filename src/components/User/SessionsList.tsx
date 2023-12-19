import { getSessionTasks } from "../../data-access/SessionAccess";
import { sessionList } from "../../store/sessionsList";
import { setTasks } from "../../store/tasks";
import { user } from "../../store/user";
import { transformTasks } from "../../utils/helper";

export default function SessionList() {
  return (
    <ul class="w-full">
      {sessionList.map((session) => {
        return (
          <li class="flex items-center justify-between p-4 border-b">
            <button
              class="text-lg font-semibold"
              onClick={() => handleSessionClick(session.session_id)}
            >
              {session.title}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

async function handleSessionClick(session_id: number) {
  if (!user.token) throw new Error("User is not logged in");

  console.log("Session clicked: ", session_id);

  const tasks = await getSessionTasks(user.token, session_id);

  setTasks(transformTasks(tasks));
}
