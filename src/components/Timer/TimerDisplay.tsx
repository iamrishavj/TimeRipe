import { createEffect, createMemo } from "solid-js";
import { formatTime } from "../../utils/helper";

import { PAGE_TITLE } from "../../config/appConfig";

type TimerDisplayProps = {
  timeLeft: number;
  isWorkTime: boolean;
  isRunning: boolean;
};

const workTimeShadow = "2px 2px 4px rgba(59, 130, 246, 0.7)"; // Blue shadow
const breakTimeShadow = "2px 2px 4px rgba(139, 92, 246, 0.7)"; // Purple shadow

export default function TimerDisplay(props: TimerDisplayProps) {
  const formattedTime = createMemo(() => formatTime(props.timeLeft));

  createEffect(() => {
    if (!props.isRunning) {
      document.title = PAGE_TITLE;
    } else {
      document.title = `${
        props.isWorkTime ? "Work" : "Break"
      }: ${formattedTime()}`;
    }
  });

  return (
    <div
      class={`text-8xl md:text-9xl font-bold ${
        props.isWorkTime ? "text-slate-200" : "text-purple-600"
      }`}
      style={{
        "text-shadow": props.isWorkTime ? workTimeShadow : breakTimeShadow,
      }}
    >
      {formattedTime()}
    </div>
  );
}
