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
      class="bg-white text-blue-500 p-4 rounded-full shadow"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
