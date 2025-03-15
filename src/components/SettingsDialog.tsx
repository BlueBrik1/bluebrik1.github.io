
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings2 } from 'lucide-react';

interface SettingsDialogProps {
  focusDuration: number;
  breakTime: number;
  intervals: number;
  onSave: (settings: { focusDuration: number; breakTime: number; intervals: number }) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ 
  focusDuration, 
  breakTime, 
  intervals, 
  onSave 
}) => {
  const [localFocusDuration, setLocalFocusDuration] = React.useState(focusDuration);
  const [localBreakTime, setLocalBreakTime] = React.useState(breakTime);
  const [localIntervals, setLocalIntervals] = React.useState(intervals);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSave = () => {
    onSave({
      focusDuration: localFocusDuration,
      breakTime: localBreakTime,
      intervals: localIntervals
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="icon" 
          variant="outline" 
          className="absolute right-6 top-6 z-20 bg-background/30 backdrop-blur-md hover:bg-background/50"
        >
          <Settings2 className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black/90 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="font-['Space_Mono']">Timer Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="focusDuration" className="text-right">
              Focus Duration (min)
            </Label>
            <Input
              id="focusDuration"
              type="number"
              value={localFocusDuration / 60}
              onChange={(e) => setLocalFocusDuration(Math.max(1, parseInt(e.target.value)) * 60)}
              className="col-span-3 bg-black/50"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="breakTime" className="text-right">
              Break Time (min)
            </Label>
            <Input
              id="breakTime"
              type="number"
              value={localBreakTime / 60}
              onChange={(e) => setLocalBreakTime(Math.max(1, parseInt(e.target.value)) * 60)}
              className="col-span-3 bg-black/50"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="intervals" className="text-right">
              Intervals
            </Label>
            <Input
              id="intervals"
              type="number"
              value={localIntervals}
              onChange={(e) => setLocalIntervals(Math.max(1, parseInt(e.target.value)))}
              className="col-span-3 bg-black/50"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} className="bg-background/30 backdrop-blur-md hover:bg-background/50">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
