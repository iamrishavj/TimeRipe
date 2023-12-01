import { createSignal } from "solid-js";
import TimerDisplay from "./TimerDisplay";
import TimerControlPanel from "./TimerControlPanel";

import {
  DEFAULT_WORK_TIME,
  DEFAULT_BREAK_TIME,
} from "../../config/timerConfig";

export default function TimerWrapper() {
  const [timeLeft, setTimeLeft] = createSignal(DEFAULT_WORK_TIME * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = createSignal(false);
  const [isWorkTime, setIsWorkTime] = createSignal(true); // true for work time, false for break

  const [currentInterval, setCurrentInterval] = createSignal<
    number | undefined
  >();

  const startTimer = () => {
    setIsRunning(true);

    // Clear any existing interval
    if (currentInterval()) clearInterval(currentInterval());

    const countdownInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 0) {
          //Clear Interval and stop the timer
          clearInterval(countdownInterval);
          setIsRunning(false);

          //Switch the flow betwen Work & Break
          setIsWorkTime(!isWorkTime());

          return isWorkTime()
            ? DEFAULT_WORK_TIME * 60
            : DEFAULT_BREAK_TIME * 60;
        }
        return prev - 1;
      });
    }, 1000);

    setCurrentInterval(countdownInterval);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(currentInterval());
  };

  const resetTimer = () => {
    clearInterval(currentInterval());
    setIsRunning(false);
    setTimeLeft(
      isWorkTime() ? DEFAULT_WORK_TIME * 60 : DEFAULT_BREAK_TIME * 60
    ); // reset to 25 or 5 minutes
  };

  const toggleTimer = () => {
    setIsWorkTime(!isWorkTime());
    resetTimer();
  };

  return (
    <div class="flex flex-col items-center justify-center h-full">
      <TimerDisplay timeLeft={timeLeft()} />
      <TimerControlPanel
        isRunning={isRunning()}
        onStart={startTimer}
        onPause={pauseTimer}
        onReset={resetTimer}
        onToggleTimer={toggleTimer}
      />
    </div>
  );
}
