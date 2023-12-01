type ControlButtonWrapperProps = {
  children: any;
  onClick: () => void;
};

export default function ControlButtonWrapper({
  children,
  onClick,
}: ControlButtonWrapperProps) {
  return (
    <button
      class="bg-white outline-none focus:scale-110 text-blue-500 p-4 rounded-full shadow hover:bg-slate-400 hover:scale-110 transform transition-all duration-200 ease-in-out"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
