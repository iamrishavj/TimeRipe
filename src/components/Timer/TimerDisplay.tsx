import { createSignal, createEffect, createMemo } from "solid-js";
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
  const [title, setTitle] = createSignal<string>(PAGE_TITLE);
  const formattedTime = createMemo(() => formatTime(props.timeLeft));

  createEffect(() => {
    const initialTitle = PAGE_TITLE;
    if (!props.isRunning) {
      setTitle(initialTitle);
    } else {
      const titleSuffix = props.isWorkTime ? "Work: " : "Break: ";
      setTitle(initialTitle + " - " + titleSuffix + formattedTime());
    }
    document.title = title(); // Set the document title reactively
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
