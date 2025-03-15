
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface YouTubeInputProps {
  onSubmit: (url: string) => void;
  isVisible: boolean;
}

const YouTubeInput: React.FC<YouTubeInputProps> = ({ onSubmit, isVisible }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  if (!isVisible) return null;

  return (
    <form onSubmit={handleSubmit} className="fixed bottom-4 left-0 right-0 flex justify-center z-20">
      <div className="bg-background/80 backdrop-blur-md p-2 rounded-md flex gap-2 w-full max-w-md">
        <Input
          type="text"
          placeholder="Enter YouTube URL"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-background/50 border-muted"
        />
        <Button type="submit" variant="outline">
          Set Video
        </Button>
      </div>
    </form>
  );
};

export default YouTubeInput;
