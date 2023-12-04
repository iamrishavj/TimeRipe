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
        {/* Your menu content here */}
      </div>
    </div>
  );
}
