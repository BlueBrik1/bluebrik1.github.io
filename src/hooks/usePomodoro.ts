
import { useState, useEffect, useCallback } from 'react';
import { getRandomQuote } from '@/utils/quotes';

type TimerMode = 'work' | 'short-break' | 'long-break';
type TimerStatus = 'running' | 'paused' | 'completed';

interface PomodoroState {
  timeLeft: number;
  mode: TimerMode;
  status: TimerStatus;
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  cyclesBeforeLongBreak: number;
  completedWorkCycles: number;
  youtubeUrl: string;
  isControlsVisible: boolean;
  isUIHidden: boolean;
  currentSessionIntervals: number;
  currentIntervalCount: number;
  motivationalQuote: string;
}

export const usePomodoro = () => {
  const [state, setState] = useState<PomodoroState>({
    timeLeft: 25 * 60, // 25 minutes in seconds
    mode: 'work',
    status: 'paused',
    workTime: 25 * 60, // 25 minutes in seconds
    shortBreakTime: 5 * 60, // 5 minutes in seconds
    longBreakTime: 15 * 60, // 15 minutes in seconds
    cyclesBeforeLongBreak: 4,
    completedWorkCycles: 0,
    youtubeUrl: '',
    isControlsVisible: true,
    isUIHidden: false,
    currentSessionIntervals: 4,
    currentIntervalCount: 0,
    motivationalQuote: getRandomQuote(),
  });

  // Timer logic
  useEffect(() => {
    let interval: number | undefined;

    if (state.status === 'running' && state.timeLeft > 0) {
      interval = window.setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          timeLeft: prevState.timeLeft - 1,
        }));
      }, 1000);
    } else if (state.status === 'running' && state.timeLeft === 0) {
      // Timer completed, switch modes
      handleTimerComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.status, state.timeLeft]);

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    const hideControls = setTimeout(() => {
      if (state.isControlsVisible && !state.isUIHidden) {
        setState((prevState) => ({
          ...prevState,
          isControlsVisible: false,
        }));
      }
    }, 3000);

    return () => clearTimeout(hideControls);
  }, [state.isControlsVisible, state.isUIHidden]);

  // Show controls on mouse move
  useEffect(() => {
    const handleMouseMove = () => {
      if (!state.isUIHidden) {
        setState((prevState) => ({
          ...prevState,
          isControlsVisible: true,
        }));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseMove);
    };
  }, [state.isUIHidden]);

  const handleTimerComplete = useCallback(() => {
    setState((prevState) => {
      let nextMode: TimerMode;
      let nextTimeLeft: number;
      let completedCycles = prevState.completedWorkCycles;
      let intervalCount = prevState.currentIntervalCount;
      let status: TimerStatus = 'running';

      if (prevState.mode === 'work') {
        completedCycles += 1;
        intervalCount += 1;
        
        // Check if we've completed all intervals for this session
        if (intervalCount >= prevState.currentSessionIntervals) {
          // We're done with all intervals, show completion screen
          return {
            ...prevState,
            status: 'completed',
            completedWorkCycles: completedCycles,
            currentIntervalCount: intervalCount,
            motivationalQuote: getRandomQuote(),
          };
        }

        // Not all intervals are done yet, go to break
        if (completedCycles % prevState.cyclesBeforeLongBreak === 0) {
          nextMode = 'long-break';
          nextTimeLeft = prevState.longBreakTime;
        } else {
          nextMode = 'short-break';
          nextTimeLeft = prevState.shortBreakTime;
        }
      } else {
        // Coming from a break, go back to work
        nextMode = 'work';
        nextTimeLeft = prevState.workTime;
      }

      return {
        ...prevState,
        mode: nextMode,
        timeLeft: nextTimeLeft,
        status: status,
        completedWorkCycles: completedCycles,
        currentIntervalCount: intervalCount,
      };
    });
  }, []);

  const startTimer = useCallback(() => {
    setState((prevState) => ({ ...prevState, status: 'running' }));
  }, []);

  const pauseTimer = useCallback(() => {
    setState((prevState) => ({ ...prevState, status: 'paused' }));
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
        status: 'paused',
      };
    });
  }, []);

  const skipToNextMode = useCallback(() => {
    handleTimerComplete();
    setState((prevState) => ({ ...prevState, status: 'paused' }));
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
        status: 'paused',
      };
    });
  }, []);

  const setYoutubeUrl = useCallback((url: string) => {
    setState((prevState) => ({ ...prevState, youtubeUrl: url }));
  }, []);

  const startNewSession = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      timeLeft: prevState.workTime,
      mode: 'work',
      status: 'paused',
      currentIntervalCount: 0,
      motivationalQuote: getRandomQuote(),
    }));
  }, []);

  const updateSettings = useCallback(({ focusDuration, breakTime, intervals }: { 
    focusDuration: number; 
    breakTime: number; 
    intervals: number;
  }) => {
    setState((prevState) => {
      // Calculate the interval work time based on total focus duration and number of intervals
      const intervalWorkTime = focusDuration / intervals;
      
      return {
        ...prevState,
        workTime: intervalWorkTime,
        shortBreakTime: breakTime,
        currentSessionIntervals: intervals,
        timeLeft: prevState.mode === 'work' ? intervalWorkTime : 
                  prevState.mode === 'short-break' ? breakTime : prevState.longBreakTime,
        status: 'paused',
        currentIntervalCount: 0,
      };
    });
  }, []);

  const toggleUIVisibility = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isUIHidden: !prevState.isUIHidden,
    }));
  }, []);

  return {
    ...state,
    startTimer,
    pauseTimer,
    resetTimer,
    skipToNextMode,
    switchMode,
    setYoutubeUrl,
    startNewSession,
    updateSettings,
    toggleUIVisibility,
  };
};
