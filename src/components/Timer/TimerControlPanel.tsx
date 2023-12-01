import { Show } from "solid-js";

import ControlButtonWrapper from "./ControlButtonWrapper";
import PauseIcon from "./ControlButtonIcons/PauseIcon";
import PlayIcon from "./ControlButtonIcons/PlayIcon";
import ResetIcon from "./ControlButtonIcons/ResetIcon";
import ForwardIcon from "./ControlButtonIcons/ForwardIcon";

const CONTROL_SIZE: number = 30;

type TimerControlPanelProps = {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onToggleTimer: () => void;
};

export default function TimerControlPanel(props: TimerControlPanelProps) {
  return (
    <div class="flex space-x-4 mt-8">
      <ControlButtonWrapper
        onClick={() => (props.isRunning ? props.onPause() : props.onStart())}
      >
        <Show when={props.isRunning}>
          <PauseIcon size={CONTROL_SIZE} />
        </Show>
        <Show when={!props.isRunning}>
          <PlayIcon size={CONTROL_SIZE} />
        </Show>
      </ControlButtonWrapper>
      <ControlButtonWrapper onClick={props.onReset}>
        <ResetIcon size={CONTROL_SIZE} />
      </ControlButtonWrapper>
      <ControlButtonWrapper onClick={props.onToggleTimer}>
        <ForwardIcon size={CONTROL_SIZE} />
      </ControlButtonWrapper>
    </div>
  );
}
