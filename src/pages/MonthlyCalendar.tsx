import { useMemo, useState } from "react";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { javaneseCalendar } from "@/lib/javanese-calendar";

const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatMonthInput(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function parseMonthInput(value: string): { year: number; monthIndex: number } {
  const [y, m] = value.split("-").map((v) => parseInt(v, 10));
  return { year: y, monthIndex: m - 1 };
}

interface DayCellData {
  date: Date;
  inCurrentMonth: boolean;
  pasaran: string;
  jDate: number;
  jMonth: string;
}

export default function MonthlyCalendar() {
  const [monthValue, setMonthValue] = useState<string>(() => formatMonthInput(new Date()));
  const { year, monthIndex } = useMemo(() => parseMonthInput(monthValue), [monthValue]);

  const firstOfMonth = useMemo(() => new Date(year, monthIndex, 1), [year, monthIndex]);
  const lastOfMonth = useMemo(() => new Date(year, monthIndex + 1, 0), [year, monthIndex]);

  const grid = useMemo(() => {
    const start = new Date(firstOfMonth);
    const startDay = start.getDay(); // 0 Sun .. 6 Sat
    start.setDate(start.getDate() - startDay);

    const weeks: { weekStart: Date; days: DayCellData[]; wuku: string }[] = [];
    const monthSpan = new Set<string>();

    for (let w = 0; w < 6; w++) {
      const weekStart = new Date(start);
      weekStart.setDate(start.getDate() + w * 7);
      const wuku = javaneseCalendar.convert(weekStart).cycles.wuku;

      const days: DayCellData[] = [];
      for (let d = 0; d < 7; d++) {
        const current = new Date(weekStart);
        current.setDate(weekStart.getDate() + d);
        const conv = javaneseCalendar.convert(current);
        days.push({
          date: current,
          inCurrentMonth: current.getMonth() === monthIndex,
          pasaran: conv.cycles.pasaran,
          jDate: conv.javanese.date,
          jMonth: conv.javanese.month,
        });
        if (current.getMonth() === monthIndex) {
          monthSpan.add(conv.javanese.month);
        }
      }
      weeks.push({ weekStart, days, wuku });
    }

    return { weeks, monthSpan: Array.from(monthSpan) };
  }, [firstOfMonth, monthIndex]);

  const monthInfo = useMemo(() => {
    const base = javaneseCalendar.convert(firstOfMonth);
    return {
      windu: base.javanese.windu,
      jYear: base.javanese.year,
      yearType: base.javanese.yearType,
    };
  }, [firstOfMonth]);

  const monthSpanLabel = useMemo(() => {
    const span = grid.monthSpan;
    if (span.length === 0) return "-";
    if (span.length === 1) return span[0];
    return `${span[0]} – ${span[span.length - 1]}`;
  }, [grid.monthSpan]);

  const pageTitle = `Monthly Javanese Calendar – ${firstOfMonth.toLocaleString(undefined, { month: 'long' })} ${year}`;
  const pageDescription = "View Gregorian month with Javanese pasaran, date+month, and weekly Wuku.";

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-1">
        <SEO title={pageTitle} description={pageDescription} canonical={typeof window !== 'undefined' ? `${window.location.origin}/month` : undefined} />

      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Javanese Monthly Calendar</h1>
      <p className="mt-2 text-muted-foreground">Pick any month and year to see the full Gregorian calendar enriched with Javanese details.</p>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end">
        <div>
          <label htmlFor="month" className="block text-sm text-muted-foreground">Select month</label>
          <input
            id="month"
            type="month"
            value={monthValue}
            onChange={(e) => setMonthValue(e.target.value)}
            className="mt-1 h-10 rounded-md border border-input bg-background px-3 text-foreground shadow-sm outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      </div>

      <section className="mt-6">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Javanese Calendar Info</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-muted-foreground">
            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <span className="font-medium text-foreground">Windu:</span> <span>{monthInfo.windu}</span>
              </div>
              <div>
                <span className="font-medium text-foreground">Javanese Year:</span> <span>{monthInfo.jYear}</span>
              </div>
              <div>
                <span className="font-medium text-foreground">Year Type:</span> <span>{monthInfo.yearType}</span>
              </div>
              <div>
                <span className="font-medium text-foreground">Javanese Months:</span> <span>{monthSpanLabel}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6">
        <ScrollArea className="w-full rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-36">Wuku</TableHead>
                {dayHeaders.map((d) => (
                  <TableHead key={d} className="text-center">{d}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {grid.weeks.map((week, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium text-foreground">{week.wuku}</TableCell>
                  {week.days.map((day) => {
                    const isDim = !day.inCurrentMonth;
                    return (
                      <TableCell key={day.date.toISOString()} className="align-top">
                        <div className="flex min-h-20 flex-col gap-1">
                          <div className={isDim ? "text-xs text-muted-foreground/70" : "text-xs text-muted-foreground"}>{day.pasaran}</div>
                          <div className={isDim ? "text-lg font-semibold text-muted-foreground/80" : "text-lg font-semibold text-foreground"}>
                            {day.date.getDate()}
                          </div>
                          <div className={isDim ? "text-xs text-muted-foreground/70" : "text-xs text-muted-foreground"}>
                            {day.jDate} {day.jMonth}
                          </div>
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </section>
      </main>
      
      <Footer />
    </div>
  );
}
