import { IconProps } from "../../types/Icon";

export default function AddUserButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-bl-xl hover:scale-110"
      onClick={onClick}
    >
      <AddUserLogo />
    </button>
  );
}

function AddUserLogo({ size = 30 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-0.08 0 20.184 20.184"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g id="add-user-circle-left" transform="translate(-2 -1.979)">
          <path
            id="secondary"
            fill="#3b82f6"
            d="M7,19.5a9,9,0,0,0,9.94,0A5,5,0,0,0,7,19.5Z"
          ></path>
          <path
            id="primary"
            d="M8.54,13A4,4,0,1,0,12,7a3.66,3.66,0,0,0-1,.13"
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></path>{" "}
          <path
            id="primary-2"
            data-name="primary"
            d="M7,19.5a9,9,0,0,0,9.94,0A5,5,0,0,0,7,19.5ZM3,9H7M5,11V7"
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></path>
          <path
            id="primary-3"
            data-name="primary"
            d="M8,3.94A9,9,0,1,1,5.64,18.36,8.86,8.86,0,0,1,3.52,15"
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></path>
        </g>
      </g>
    </svg>
  );
}
