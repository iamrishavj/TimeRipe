import { formatTime } from "../../utils/helper";

type TimerDisplayProps = {
  timeLeft: number;
};

export default function TimerDisplay(props: TimerDisplayProps) {
  return (
    <div class="text-6xl md:text-8xl text-white font-bold">
      {formatTime(props.timeLeft)}
    </div>
  );
}
