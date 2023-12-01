import { DEFAULT_CONTROL_SIZE } from "../../../utils/controlButtonConfig";
import { IconProps } from "../../../types/Timer";

export default function ForwardIcon({
  size = DEFAULT_CONTROL_SIZE,
}: IconProps) {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="-0.5 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.98047 3.51001C1.43047 4.39001 0.980469 9.09992 0.980469 12.4099C0.980469 15.7199 1.41047 20.4099 3.98047 21.3199C6.69047 22.2499 14.9805 16.1599 14.9805 12.4099C14.9805 8.65991 6.69047 2.58001 3.98047 3.51001Z"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.9805 21.3199C14.6905 22.2499 22.9805 16.1599 22.9805 12.4099C22.9805 8.65991 14.6705 2.58001 11.9805 3.51001"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
