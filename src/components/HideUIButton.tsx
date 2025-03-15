
import React from 'react';
import { Button } from '@/components/ui/button';
import { EyeOffIcon, EyeIcon } from 'lucide-react';

interface HideUIButtonProps {
  isHidden: boolean;
  onToggle: () => void;
}

const HideUIButton: React.FC<HideUIButtonProps> = ({ isHidden, onToggle }) => {
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={onToggle}
      className="absolute left-6 top-6 z-20 bg-background/30 backdrop-blur-md hover:bg-background/50"
    >
      {isHidden ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
      <span className="sr-only">{isHidden ? 'Show UI' : 'Hide UI'}</span>
    </Button>
  );
};

export default HideUIButton;
