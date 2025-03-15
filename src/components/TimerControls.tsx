
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlayIcon, PauseIcon, RotateCcwIcon, SkipForwardIcon } from 'lucide-react';

interface TimerControlsProps {
  isActive: boolean;
  mode: 'work' | 'short-break' | 'long-break';
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  onModeChange: (mode: 'work' | 'short-break' | 'long-break') => void;
  isVisible: boolean;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isActive,
  mode,
  onStart,
  onPause,
  onReset,
  onSkip,
  onModeChange,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 flex flex-col items-center space-y-4 z-20">
      <div className="flex space-x-2">
        <Button
          variant={mode === 'work' ? 'default' : 'outline'}
          onClick={() => onModeChange('work')}
          className="bg-background/30 backdrop-blur-md hover:bg-background/50"
        >
          Work
        </Button>
        <Button
          variant={mode === 'short-break' ? 'default' : 'outline'}
          onClick={() => onModeChange('short-break')}
          className="bg-background/30 backdrop-blur-md hover:bg-background/50"
        >
          Short Break
        </Button>
        <Button
          variant={mode === 'long-break' ? 'default' : 'outline'}
          onClick={() => onModeChange('long-break')}
          className="bg-background/30 backdrop-blur-md hover:bg-background/50"
        >
          Long Break
        </Button>
      </div>
      
      <div className="flex space-x-2">
        {isActive ? (
          <Button
            variant="outline"
            onClick={onPause}
            className="bg-background/30 backdrop-blur-md hover:bg-background/50"
          >
            <PauseIcon className="mr-2 h-4 w-4" /> Pause
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={onStart}
            className="bg-background/30 backdrop-blur-md hover:bg-background/50"
          >
            <PlayIcon className="mr-2 h-4 w-4" /> Start
          </Button>
        )}
        <Button
          variant="outline"
          onClick={onReset}
          className="bg-background/30 backdrop-blur-md hover:bg-background/50"
        >
          <RotateCcwIcon className="mr-2 h-4 w-4" /> Reset
        </Button>
        <Button
          variant="outline"
          onClick={onSkip}
          className="bg-background/30 backdrop-blur-md hover:bg-background/50"
        >
          <SkipForwardIcon className="mr-2 h-4 w-4" /> Skip
        </Button>
      </div>
    </div>
  );
};

export default TimerControls;
