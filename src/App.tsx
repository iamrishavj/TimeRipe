import { Show, createSignal } from "solid-js";
import toast from "solid-toast";

import PomodoroTimer from "./components/Timer/PomodoroTimer";
import TaskManager from "./components/TaskManager/TaskManager";
import AddUserButton from "./components/User/AddUserButton";
import LogOutUserButton from "./components/User/LogOutUserButton";
import SessionListButton from "./components/User/SessionListButton";
import UserModal from "./components/User/UserModal";
import SessionListMenu from "./components/User/SessionListMenu";
import { getSessions } from "./data-access/Sessions";
import { user } from "./store/user";
import { logOut } from "./services/userService";

function App() {
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = createSignal(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen());

  // Conditional class to apply a blur effect
  const mainContentClass = () => (isModalOpen() ? "filter blur-sm" : "");

  return (
    <>
      <div
        class={`flex flex-col h-screen overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 ${mainContentClass()}`}
      >
        {/* Relative container for the timer and buttons */}
        <div class="relative" style={{ height: "33.333%" }}>
          {/* Position the session list button on the top left with z-index */}
          <div class="absolute top-5 left-0 transform -translate-y-1/2 z-10">
            <Show when={user.isLoggedIn}>
              <SessionListButton
                onClick={() => {
                  setIsSideMenuOpen(true);
                  getSessions();
                }}
              />
            </Show>
          </div>

          {/* Pomodoro timer in the center with z-index */}

          <PomodoroTimer />

          {/* Position the add user button on the top right with z-index */}
          <div class="absolute top-5 right-0 transform -translate-y-1/2 z-10">
            <Show when={!user.isLoggedIn}>
              <AddUserButton onClick={toggleModal} />
            </Show>
            <Show when={user.isLoggedIn}>
              <LogOutUserButton
                onClick={() => {
                  logOut();
                  toast.success("Logged out successfully!");
                }}
              />
            </Show>
          </div>
        </div>

        {/* Task manager section */}
        <div class="flex-1 flex overflow-hidden gap-1">
          <TaskManager />
        </div>
      </div>
      <Show when={isSideMenuOpen() && user.isLoggedIn}>
        <SessionListMenu
          isOpen={isSideMenuOpen()}
          toggleMenu={() => setIsSideMenuOpen(false)}
        />
      </Show>
      <Show when={isModalOpen()}>
        <UserModal onClose={toggleModal} />
      </Show>
    </>
  );
}

export default App;
