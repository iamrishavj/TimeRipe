import { DEFAULT_CONTROL_SIZE } from "../../../utils/controlButtonConfig";
import { IconProps } from "../../../types/Timer";

export default function ResetIcon({ size = DEFAULT_CONTROL_SIZE }: IconProps) {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 21 21"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        fill-rule="evenodd"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        transform="translate(2 2)"
      >
        <path d="m12.5 1.5c2.4138473 1.37729434 4 4.02194088 4 7 0 4.418278-3.581722 8-8 8s-8-3.581722-8-8 3.581722-8 8-8" />

        <path d="m12.5 5.5v-4h4" />
      </g>
    </svg>
  );
}
