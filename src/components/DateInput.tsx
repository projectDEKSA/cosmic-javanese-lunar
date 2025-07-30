import { useState } from 'react';
import { Calendar, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';

interface DateInputProps {
  value: string;
  onChange: (date: string) => void;
  onToday: () => void;
}

export const DateInput = ({ value, onChange, onToday }: DateInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Validate and format the date
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(newValue)) {
      onChange(newValue);
    }
  };

  const handleTodayClick = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    setInputValue(today);
    onToday();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date-input" className="text-sm font-medium text-foreground/90">
          Select Gregorian Date
        </Label>
        <div className="relative">
          <Input
            id="date-input"
            type="date"
            value={inputValue}
            onChange={handleInputChange}
            className="glass-input pr-10 text-foreground placeholder:text-muted-foreground"
            placeholder="YYYY-MM-DD"
          />
          <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>
      
      <Button 
        onClick={handleTodayClick}
        variant="outline" 
        className="w-full glass-card hover:bg-primary/10 transition-all duration-300 hover:shadow-lg"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Today's Date
      </Button>
    </div>
  );
};