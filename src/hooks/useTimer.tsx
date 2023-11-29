import { createSignal, onCleanup } from "solid-js";

type TimerState = "running" | "paused" | "stopped";

export function useTimer(initialTime: number) {
  const [time, setTime] = createSignal(initialTime);
  const [state, setState] = createSignal<TimerState>("running");

  let interval: number;

  function startTimer() {
    interval = setInterval(() => {
      if (time() === 0) {
        clearInterval(interval);
        return;
      }
      setTime((prevTime) => prevTime - 1);
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(interval);
    setState("paused");
  }

  function resetTimer() {
    clearInterval(interval);
    setTime(initialTime);
    setState("stopped");
  }

  onCleanup(() => {
    clearInterval(interval);
  });

  return {
    time,
    isRunning: state() === "running",
    startTimer,
    pauseTimer,
    resetTimer,
  };
}
