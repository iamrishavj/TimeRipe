import { Component } from "solid-js";

type Props = {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onToggleTimer: () => void;
};

const ControlButtons: Component<Props> = (props) => {
  return (
    <div class="flex space-x-4 mt-8">
      <button
        class="bg-white text-blue-500 px-4 py-2 rounded shadow"
        onClick={props.isRunning ? props.onPause : props.onStart}
      >
        {props.isRunning ? "Pause" : "Start"}
      </button>
      <button
        class="bg-white text-blue-500 px-4 py-2 rounded shadow"
        onClick={props.onReset}
      >
        Reset
      </button>
      <button
        class="bg-white text-blue-500 px-4 py-2 rounded shadow"
        onClick={props.onToggleTimer}
      >
        Toggle Work/Break
      </button>
    </div>
  );
};

export default ControlButtons;
