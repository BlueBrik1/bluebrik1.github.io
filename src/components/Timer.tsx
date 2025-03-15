
import React, { useEffect, useState } from 'react';

interface TimerProps {
  timeLeft: number;
  mode: 'work' | 'short-break' | 'long-break';
  isUIHidden: boolean;
  modeJustChanged?: boolean;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, mode, isUIHidden, modeJustChanged = false }) => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Handle blinking effect on mode change
  useEffect(() => {
    if (modeJustChanged) {
      setIsBlinking(true);
      
      const blinkTimer = setTimeout(() => {
        setIsBlinking(false);
      }, 3000); // Blink for 3 seconds
      
      return () => clearTimeout(blinkTimer);
    }
  }, [modeJustChanged]);

  if (isUIHidden) return null;

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Format time as MM:SS
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Get label based on mode
  const modeLabel = mode === 'work' ? 'Work' : 'Break';

  // Determine text color based on mode
  const textColor = mode === 'work' ? 'text-orange-500' : 'text-white';
  
  // Determine shadow color based on mode
  const shadowColor = mode === 'work' 
    ? 'drop-shadow-[0_0_30px_rgba(249,115,22,0.5)]'
    : 'drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]';

  // Apply blinking animation if needed
  const blinkingClass = isBlinking ? 'animate-pulse' : '';

  return (
    <div className="flex flex-col items-center justify-center z-10 animate-fade-in">
      <h2 className={`text-2xl ${textColor} opacity-50 mb-2 font-['Space_Mono']`}>{modeLabel}</h2>
      <div className={`text-[13.5rem] font-bold tracking-tighter ${textColor} font-['Space_Mono'] ${shadowColor} ${blinkingClass}`}>
        {formattedTime}
      </div>
    </div>
  );
};

export default Timer;
