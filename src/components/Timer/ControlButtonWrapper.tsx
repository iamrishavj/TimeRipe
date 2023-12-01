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
      class="bg-white text-blue-500 p-4 rounded-full shadow hover:bg-slate-400"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
