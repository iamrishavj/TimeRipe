import { Component, createSignal } from "solid-js";
import TimerDisplay from "./TimerDisplay";
import TimerControlPanel from "./TimerControlPanel";

const DEFAULT_WORK_TIME = 25; // 25 minutes in seconds
const DEFAULT_BREAK_TIME = 5; // 5 minutes in seconds

const TimerWrapper: Component = () => {
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
          clearInterval(countdownInterval);
          setIsRunning(false);
          return isWorkTime()
            ? DEFAULT_BREAK_TIME * 60
            : DEFAULT_WORK_TIME * 60;
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
};

export default TimerWrapper;
