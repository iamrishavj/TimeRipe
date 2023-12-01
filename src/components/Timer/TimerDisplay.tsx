import { Component } from "solid-js";

import { formatTime } from "../../utils/helper";

type Props = {
  timeLeft: number;
};

const TimerDisplay: Component<Props> = (props) => {
  return (
    <div class="text-6xl md:text-8xl text-white font-bold">
      {formatTime(props.timeLeft)}
    </div>
  );
};

export default TimerDisplay;
