import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { StarField } from '@/components/StarField';
import { DateInput } from '@/components/DateInput';
import { ResultCard } from '@/components/ResultCard';
import { InfoCards } from '@/components/InfoCards';
import { javaneseCalendar, JavaneseCalendarResult } from '@/lib/javanese-calendar';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [result, setResult] = useState<JavaneseCalendarResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const convertDate = async (dateString: string) => {
    setIsLoading(true);
    try {
      // Add a small delay for smooth UX
      await new Promise(resolve => setTimeout(resolve, 300));
      const converted = javaneseCalendar.convert(dateString);
      setResult(converted);
    } catch (error) {
      console.error('Error converting date:', error);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (dateString: string) => {
    setSelectedDate(dateString);
    convertDate(dateString);
  };

  const handleTodayClick = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    setSelectedDate(today);
    convertDate(today);
  };

  // Convert today's date on initial load
  useEffect(() => {
    convertDate(selectedDate);
  }, []);

  return (
    <div className="min-h-screen relative">
      <StarField />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold font-mystical mb-6 bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent">
            Javanese Calendar
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover the mystical wisdom of traditional Javanese timekeeping. 
            Convert modern dates to ancient cycles of cosmic harmony.
          </p>
        </div>

        {/* Main Converter */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 mb-16">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="glass-card p-8 rounded-2xl animate-fade-in-up">
              <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">
                Date Converter
              </h2>
              <DateInput 
                value={selectedDate}
                onChange={handleDateChange}
                onToday={handleTodayClick}
              />
            </div>
          </div>

          {/* Result Section */}
          <div>
            <ResultCard result={result} isLoading={isLoading} />
          </div>
        </div>

        {/* Information Cards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Understanding the Cycles
          </h2>
          <InfoCards />
        </div>
      </div>
    </div>
  );
};

export default Index;
