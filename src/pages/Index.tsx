
import React from 'react';
import { usePomodoro } from '@/hooks/usePomodoro';
import Timer from '@/components/Timer';
import TimerControls from '@/components/TimerControls';
import YouTubeInput from '@/components/YouTubeInput';
import YouTubePlayer from '@/components/YouTubePlayer';
import CompletionScreen from '@/components/CompletionScreen';
import SettingsDialog from '@/components/SettingsDialog';
import HideUIButton from '@/components/HideUIButton';

const Index = () => {
  const pomodoro = usePomodoro();

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* YouTube player in background - always playing */}
      <YouTubePlayer url={pomodoro.youtubeUrl} isPlaying={true} />
      
      {/* Settings Button and Hide UI Button */}
      <SettingsDialog 
        focusDuration={pomodoro.workTime * pomodoro.currentSessionIntervals}
        breakTime={pomodoro.shortBreakTime}
        intervals={pomodoro.currentSessionIntervals}
        onSave={pomodoro.updateSettings}
      />
      
      <HideUIButton 
        isHidden={pomodoro.isUIHidden} 
        onToggle={pomodoro.toggleUIVisibility} 
      />
      
      {/* Show appropriate screen based on status */}
      {pomodoro.status === 'completed' ? (
        <CompletionScreen 
          quote={pomodoro.motivationalQuote}
          onStartAnother={pomodoro.startNewSession}
        />
      ) : (
        <>
          {/* Main timer display */}
          <Timer 
            timeLeft={pomodoro.timeLeft} 
            mode={pomodoro.mode} 
            isUIHidden={pomodoro.isUIHidden}
          />
          
          {/* Timer controls */}
          <TimerControls 
            isActive={pomodoro.status === 'running'}
            mode={pomodoro.mode}
            onStart={pomodoro.startTimer}
            onPause={pomodoro.pauseTimer}
            onReset={pomodoro.resetTimer}
            onSkip={pomodoro.skipToNextMode}
            onModeChange={pomodoro.switchMode}
            isVisible={pomodoro.isControlsVisible && !pomodoro.isUIHidden}
          />
        </>
      )}
      
      {/* YouTube URL input */}
      <YouTubeInput 
        onSubmit={pomodoro.setYoutubeUrl} 
        isVisible={pomodoro.isControlsVisible && !pomodoro.isUIHidden}
      />
    </div>
  );
};

export default Index;
