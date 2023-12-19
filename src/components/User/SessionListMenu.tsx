import {
  createNewSession,
  getAllSessions,
} from "../../data-access/SessionAccess";
import { setSessionList } from "../../store/sessionsList";
import { user } from "../../store/user";
import SessionsList from "./SessionsList";

export default function SessionListMenu(props: {
  isOpen: boolean;
  toggleMenu: () => void;
}) {
  const { isOpen, toggleMenu } = props;

  // Determine the appropriate CSS classes based on whether the menu is open
  const containerClasses = () =>
    isOpen ? "fixed inset-0 z-40" : "fixed inset-0 z-40 pointer-events-none";

  const menuClasses = () => (isOpen ? "translate-x-0" : "-translate-x-full");

  // Click handler for the backdrop to close the menu
  const closeMenu = (event: any) => {
    // Check if the clicked element is the backdrop itself, not its children
    if (event.target === event.currentTarget) {
      toggleMenu();
    }
  };

  return (
    <div class={containerClasses()}>
      {/* Backdrop with click handler */}
      <div class="absolute inset-0 bg-black opacity-50" onClick={closeMenu} />

      {/* Side menu */}
      <div
        class={`fixed left-0 top-0 w-1/2 md:w-1/4 h-full bg-gray-100 no-scrollbar overflow-hidden shadow-md z-30 transform transition-all duration-500 ${menuClasses()}`}
      >
        <div class="w-full flex flex-row justify-between items-center px-6 pt-2 font-semibold h-fit">
          <span>Create Session</span>
          <span>
            <AddSessionButton onClick={handleCreateSession} />
          </span>
        </div>
        {/* Side Menu content here */}
        <SessionsList />
      </div>
    </div>
  );
}

function AddSessionButton({
  size = 28,
  onClick,
}: {
  size?: number;
  onClick?: () => void;
}) {
  return (
    <button
      class="text-white font-bold rounded hover:scale-110 transition-all duration-200"
      onClick={onClick}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
          stroke="#1C274C"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
          stroke="#1C274C"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </button>
  );
}

async function handleCreateSession() {
  if (!user.token) throw new Error("User is not logged in");

  await createNewSession(user.token);

  getAllSessions(user.token).then((sessions) => {
    setSessionList(sessions);
  });
}
