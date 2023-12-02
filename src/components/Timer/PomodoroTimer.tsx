import { createSignal } from "solid-js";

import toast from "solid-toast";

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

    AlertStartofSession(timeLeft());

    // Clear any existing interval
    if (currentInterval()) clearInterval(currentInterval());

    const countdownInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 0) {
          //Clear Interval and stop the timer
          clearInterval(countdownInterval);
          setIsRunning(false);

          if (isWorkTime()) AlertEndofSession();

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
    <div class="flex flex-col items-center justify-center p-4 h-full">
      <div class="flex flex-col items-center justify-center p-2 w-full max-w-lg mx-auto bg-gradient-to-r from-blue-400 via-blue-300 to-purple-500 rounded-2xl shadow-2xl transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-md">
        <TimerDisplay timeLeft={timeLeft()} isWorkTime={isWorkTime()} />
        <TimerControlPanel
          isRunning={isRunning()}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
          onToggleTimer={toggleTimer}
        />
      </div>
    </div>
  );
}

function AlertStartofSession(timeLeft: number) {
  if (timeLeft === DEFAULT_WORK_TIME * 60)
    toast.success("Work Session Started!", {
      icon: "💪🏼",
      position: "bottom-center",
      style: {
        background: "#059669",
        color: "#FFFFFF",
      },
    });
  else if (timeLeft === DEFAULT_BREAK_TIME * 60)
    toast.success("Break Session Started!", {
      icon: "😴",
      position: "bottom-center",
      style: {
        background: "#8B5CF6",
        color: "#FFFFFF",
      },
    });
}

function AlertEndofSession() {
  toast.success("Session Ended!", {
    icon: "🎉",
    position: "bottom-center",
    style: {
      background: "#10B981",
      color: "#FFFFFF",
    },
  });
}
