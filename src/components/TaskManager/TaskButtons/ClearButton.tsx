export default function ClearButton({
  size = 28,
  onClick,
  customClass,
}: {
  size?: number;
  onClick: () => void;
  customClass?: string;
}) {
  return (
    <button
      class={`ml-1 outline-none focus:scale-105 hover:scale-110 transition-all duration-200 ${customClass}}`}
      onClick={onClick}
      aria-label="Clear tasks"
      title="Clear all tasks"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke="#000000"
          stroke-width="2"
          d="M10,4 C10,2.8954305 10.8954305,2 12,2 C13.1045695,2 14,2.8954305 14,4 L14,10 L20,10 L20,14 L4,14 L4,10 L10,10 L10,4 Z M4,14 L20,14 L20,22 L12,22 L4,22 L4,14 Z M16,22 L16,16.3646005 M8,22 L8,16.3646005 M12,22 L12,16.3646005"
        />
      </svg>
    </button>
  );
}
