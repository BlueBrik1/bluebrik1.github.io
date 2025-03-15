
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlayIcon } from 'lucide-react';

interface CompletionScreenProps {
  quote: string;
  onStartAnother: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ quote, onStartAnother }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 z-10">
      <h2 className="text-4xl font-bold tracking-tighter font-['Space_Mono'] text-center max-w-2xl">
        {quote}
      </h2>
      <Button 
        onClick={onStartAnother} 
        size="lg" 
        className="bg-background/30 backdrop-blur-md hover:bg-background/50"
      >
        <PlayIcon className="mr-2 h-5 w-5" /> Start Another Session
      </Button>
    </div>
  );
};

export default CompletionScreen;
