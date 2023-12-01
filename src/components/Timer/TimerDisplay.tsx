import { formatTime } from "../../utils/helper";

type TimerDisplayProps = {
  timeLeft: number;
  isWorkTime: boolean;
};

export default function TimerDisplay(props: TimerDisplayProps) {
  // Define the shadow styles
  const workTimeShadow = "2px 2px 4px rgba(59, 130, 246, 0.7)"; // Blue shadow
  const breakTimeShadow = "2px 2px 4px rgba(139, 92, 246, 0.7)"; // Purple shadow

  return (
    <div
      class={`text-8xl md:text-9xl font-bold ${
        props.isWorkTime ? "text-slate-200" : "text-purple-600"
      }`}
      style={{
        "text-shadow": props.isWorkTime ? workTimeShadow : breakTimeShadow,
      }}
    >
      {formatTime(props.timeLeft)}
    </div>
  );
}
