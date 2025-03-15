
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlayIcon } from 'lucide-react';

interface CompletionScreenProps {
  quote: string;
  onStartAnother: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ quote, onStartAnother }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 z-10 animate-fade-in">
      <div className="bg-black/50 p-8 rounded-lg backdrop-blur-sm max-w-2xl">
        <h2 className="text-4xl font-bold tracking-tighter font-['Space_Mono'] text-center text-orange-500">
          {quote}
        </h2>
      </div>
      <Button 
        onClick={onStartAnother} 
        size="lg" 
        className="bg-background/30 backdrop-blur-md hover:bg-background/50 text-orange-500 border-orange-500/30 transition-all duration-300 hover:scale-105"
      >
        <PlayIcon className="mr-2 h-5 w-5" /> Start Another Session
      </Button>
    </div>
  );
};

export default CompletionScreen;
