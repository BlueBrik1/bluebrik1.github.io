
import React from 'react';
import { usePomodoro } from '@/hooks/usePomodoro';
import Timer from '@/components/Timer';
import TimerControls from '@/components/TimerControls';
import YouTubeInput from '@/components/YouTubeInput';
import YouTubePlayer from '@/components/YouTubePlayer';

const Index = () => {
  const pomodoro = usePomodoro();

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* YouTube player in background */}
      <YouTubePlayer url={pomodoro.youtubeUrl} isPlaying={pomodoro.isActive} />
      
      {/* Main timer display */}
      <Timer 
        timeLeft={pomodoro.timeLeft} 
        mode={pomodoro.mode} 
      />
      
      {/* Timer controls */}
      <TimerControls 
        isActive={pomodoro.isActive}
        mode={pomodoro.mode}
        onStart={pomodoro.startTimer}
        onPause={pomodoro.pauseTimer}
        onReset={pomodoro.resetTimer}
        onSkip={pomodoro.skipToNextMode}
        onModeChange={pomodoro.switchMode}
        isVisible={pomodoro.isControlsVisible}
      />
      
      {/* YouTube URL input */}
      <YouTubeInput 
        onSubmit={pomodoro.setYoutubeUrl} 
        isVisible={pomodoro.isControlsVisible}
      />
    </div>
  );
};

export default Index;
