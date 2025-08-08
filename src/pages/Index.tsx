import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Sun, Moon } from 'lucide-react';
import { DateInput } from '@/components/DateInput';
import { ResultCard } from '@/components/ResultCard';
import { InfoCards } from '@/components/InfoCards';
import { javaneseCalendar, JavaneseCalendarResult } from '@/lib/javanese-calendar';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [result, setResult] = useState<JavaneseCalendarResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') return stored as 'light' | 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeToggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');

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
      
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-end mb-6">
          <button onClick={handleThemeToggle} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
        <div className="text-center mb-16">
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
            <div className="p-6 md:p-8 rounded-xl border bg-background shadow-sm">
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
