import { IconProps } from "../../types/Icon";

export default function SessionListButton(props: { onClick: () => void }) {
  return (
    <button
      class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-br-xl hover:scale-110"
      onClick={props.onClick}
    >
      <SessionListLogo />
    </button>
  );
}

function SessionListLogo({ size = 30 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12H20M4 8H20M4 16H12"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
