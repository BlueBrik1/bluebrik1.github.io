
import { useState, useEffect, useCallback } from 'react';

type TimerMode = 'work' | 'short-break' | 'long-break';

interface PomodoroState {
  timeLeft: number;
  mode: TimerMode;
  isActive: boolean;
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  cyclesBeforeLongBreak: number;
  completedWorkCycles: number;
  youtubeUrl: string;
  isControlsVisible: boolean;
}

export const usePomodoro = () => {
  const [state, setState] = useState<PomodoroState>({
    timeLeft: 25 * 60, // 25 minutes in seconds
    mode: 'work',
    isActive: false,
    workTime: 25 * 60, // 25 minutes in seconds
    shortBreakTime: 5 * 60, // 5 minutes in seconds
    longBreakTime: 15 * 60, // 15 minutes in seconds
    cyclesBeforeLongBreak: 4,
    completedWorkCycles: 0,
    youtubeUrl: '',
    isControlsVisible: true,
  });

  // Timer logic
  useEffect(() => {
    let interval: number | undefined;

    if (state.isActive && state.timeLeft > 0) {
      interval = window.setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          timeLeft: prevState.timeLeft - 1,
        }));
      }, 1000);
    } else if (state.isActive && state.timeLeft === 0) {
      // Timer completed, switch modes
      handleTimerComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.isActive, state.timeLeft]);

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    const hideControls = setTimeout(() => {
      if (state.isControlsVisible) {
        setState((prevState) => ({
          ...prevState,
          isControlsVisible: false,
        }));
      }
    }, 3000);

    return () => clearTimeout(hideControls);
  }, [state.isControlsVisible]);

  // Show controls on mouse move
  useEffect(() => {
    const handleMouseMove = () => {
      setState((prevState) => ({
        ...prevState,
        isControlsVisible: true,
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseMove);
    };
  }, []);

  const handleTimerComplete = useCallback(() => {
    setState((prevState) => {
      let nextMode: TimerMode;
      let nextTimeLeft: number;
      let completedCycles = prevState.completedWorkCycles;

      if (prevState.mode === 'work') {
        completedCycles += 1;
        if (completedCycles % prevState.cyclesBeforeLongBreak === 0) {
          nextMode = 'long-break';
          nextTimeLeft = prevState.longBreakTime;
        } else {
          nextMode = 'short-break';
          nextTimeLeft = prevState.shortBreakTime;
        }
      } else {
        nextMode = 'work';
        nextTimeLeft = prevState.workTime;
      }

      return {
        ...prevState,
        mode: nextMode,
        timeLeft: nextTimeLeft,
        completedWorkCycles: completedCycles,
      };
    });
  }, []);

  const startTimer = useCallback(() => {
    setState((prevState) => ({ ...prevState, isActive: true }));
  }, []);

  const pauseTimer = useCallback(() => {
    setState((prevState) => ({ ...prevState, isActive: false }));
  }, []);

  const resetTimer = useCallback(() => {
    setState((prevState) => {
      const timeForCurrentMode =
        prevState.mode === 'work'
          ? prevState.workTime
          : prevState.mode === 'short-break'
          ? prevState.shortBreakTime
          : prevState.longBreakTime;

      return {
        ...prevState,
        timeLeft: timeForCurrentMode,
        isActive: false,
      };
    });
  }, []);

  const skipToNextMode = useCallback(() => {
    handleTimerComplete();
    setState((prevState) => ({ ...prevState, isActive: false }));
  }, [handleTimerComplete]);

  const switchMode = useCallback((mode: TimerMode) => {
    setState((prevState) => {
      const timeForMode =
        mode === 'work'
          ? prevState.workTime
          : mode === 'short-break'
          ? prevState.shortBreakTime
          : prevState.longBreakTime;

      return {
        ...prevState,
        mode,
        timeLeft: timeForMode,
        isActive: false,
      };
    });
  }, []);

  const setYoutubeUrl = useCallback((url: string) => {
    setState((prevState) => ({ ...prevState, youtubeUrl: url }));
  }, []);

  return {
    ...state,
    startTimer,
    pauseTimer,
    resetTimer,
    skipToNextMode,
    switchMode,
    setYoutubeUrl,
  };
};
