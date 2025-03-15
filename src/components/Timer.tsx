
import React from 'react';

interface TimerProps {
  timeLeft: number;
  mode: 'work' | 'short-break' | 'long-break';
  isUIHidden: boolean;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, mode, isUIHidden }) => {
  if (isUIHidden) return null;

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Format time as MM:SS
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Get label based on mode
  const modeLabel = mode === 'work' ? 'Work' : mode === 'short-break' ? 'Short Break' : 'Long Break';

  return (
    <div className="flex flex-col items-center justify-center z-10 animate-fade-in">
      <h2 className="text-2xl text-orange-500 opacity-50 mb-2 font-['Space_Mono']">{modeLabel}</h2>
      <div className="text-[13.5rem] font-bold tracking-tighter text-orange-500 font-['Space_Mono']">{formattedTime}</div>
    </div>
  );
};

export default Timer;
