import { useEffect, useMemo, useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { javaneseCalendar, JavaneseMonth, JavaneseCalendarConverter } from '@/lib/javanese-calendar';

interface DateInputProps {
  value: string;
  onChange: (date: string) => void;
  onToday: () => void;
}

const GREGORIAN_MONTHS = [
  'January','February','March','April','May','June','July','August','September','October','November','December'
];

export const DateInput = ({ value, onChange, onToday }: DateInputProps) => {
  const [mode, setMode] = useState<'gregorian' | 'javanese'>('gregorian');

  // Gregorian fields
  const [gDay, setGDay] = useState<string>('');
  const [gMonth, setGMonth] = useState<string>('');
  const [gYear, setGYear] = useState<string>('');

  // Javanese fields
  const JV_MONTHS = useMemo(() => JavaneseCalendarConverter.getConstants().MONTHS as unknown as JavaneseMonth[], []);
  const [jDay, setJDay] = useState<string>('');
  const [jMonth, setJMonth] = useState<JavaneseMonth | ''>('');
  const [jYear, setJYear] = useState<string>('');

  // Initialize fields from incoming value
  useEffect(() => {
    const d = new Date(value);
    if (!isNaN(d.getTime())) {
      setGDay(String(d.getDate()));
      setGMonth(GREGORIAN_MONTHS[d.getMonth()]);
      setGYear(String(d.getFullYear()));

      const res = javaneseCalendar.convert(value);
      setJDay(String(res.javanese.date));
      setJMonth(res.javanese.month as JavaneseMonth);
      setJYear(String(res.javanese.year));
    }
  }, [value]);

  const tryEmitGregorian = (yearStr: string, monthName: string, dayStr: string) => {
    const y = parseInt(yearStr, 10);
    const d = parseInt(dayStr, 10);
    const mIndex = GREGORIAN_MONTHS.indexOf(monthName);
    if (!isNaN(y) && !isNaN(d) && mIndex >= 0) {
      const candidate = new Date(y, mIndex, d);
      if (
        candidate.getFullYear() === y &&
        candidate.getMonth() === mIndex &&
        candidate.getDate() === d
      ) {
        onChange(format(candidate, 'yyyy-MM-dd'));
      }
    }
  };

  const tryEmitJavanese = (yearStr: string, monthName: JavaneseMonth | '', dayStr: string) => {
    const y = parseInt(yearStr, 10);
    const d = parseInt(dayStr, 10);
    if (!isNaN(y) && !isNaN(d) && monthName) {
      try {
        const converted = javaneseCalendar.convertFromJavanese({ date: d, month: monthName as JavaneseMonth, year: y });
        onChange(converted.gregorian.date);
      } catch (e) {
        // ignore until all fields valid
      }
    }
  };

  const handleTodayClick = () => {
    const today = new Date();
    setGDay(String(today.getDate()));
    setGMonth(GREGORIAN_MONTHS[today.getMonth()]);
    setGYear(String(today.getFullYear()));

    const currentJ = javaneseCalendar.convert(today);
    setJDay(String(currentJ.javanese.date));
    setJMonth(currentJ.javanese.month as JavaneseMonth);
    setJYear(String(currentJ.javanese.year));

    onToday();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground/90">Input Type</Label>
        <Tabs value={mode} onValueChange={(v) => setMode(v as 'gregorian' | 'javanese')}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="gregorian">Gregorian</TabsTrigger>
            <TabsTrigger value="javanese">Javanese</TabsTrigger>
          </TabsList>

          <TabsContent value="gregorian" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label htmlFor="g-day">Day</Label>
                <Input
                  id="g-day"
                  type="number"
                  min={1}
                  max={31}
                  value={gDay}
                  onChange={(e) => {
                    const v = e.target.value;
                    setGDay(v);
                    tryEmitGregorian(gYear, gMonth, v);
                  }}
                  className="text-foreground placeholder:text-muted-foreground"
                  placeholder="1"
                />
              </div>
              <div className="space-y-1">
                <Label>Month</Label>
                <Select
                  value={gMonth || undefined}
                  onValueChange={(v) => {
                    setGMonth(v);
                    tryEmitGregorian(gYear, v, gDay);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {GREGORIAN_MONTHS.map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="g-year">Year</Label>
                <Input
                  id="g-year"
                  type="number"
                  value={gYear}
                  onChange={(e) => {
                    const v = e.target.value;
                    setGYear(v);
                    tryEmitGregorian(v, gMonth, gDay);
                  }}
                  className="text-foreground placeholder:text-muted-foreground"
                  placeholder="2024"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="javanese" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label htmlFor="j-day">Date</Label>
                <Input
                  id="j-day"
                  type="number"
                  min={1}
                  max={30}
                  value={jDay}
                  onChange={(e) => {
                    const v = e.target.value;
                    setJDay(v);
                    tryEmitJavanese(jYear, jMonth, v);
                  }}
                  className="text-foreground placeholder:text-muted-foreground"
                  placeholder="1"
                />
              </div>
              <div className="space-y-1">
                <Label>Month</Label>
                <Select
                  value={(jMonth as string) || undefined}
                  onValueChange={(v) => {
                    const m = v as JavaneseMonth;
                    setJMonth(m);
                    tryEmitJavanese(jYear, m, jDay);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {JV_MONTHS.map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="j-year">Year (AJ)</Label>
                <Input
                  id="j-year"
                  type="number"
                  value={jYear}
                  onChange={(e) => {
                    const v = e.target.value;
                    setJYear(v);
                    tryEmitJavanese(v, jMonth, jDay);
                  }}
                  className="text-foreground placeholder:text-muted-foreground"
                  placeholder="1955"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Button 
        onClick={handleTodayClick}
        variant="outline" 
        className="w-full hover:bg-primary/10 transition-all duration-300 hover:shadow-lg"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Today's Date
      </Button>
    </div>
  );
};