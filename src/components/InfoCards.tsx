import { Calendar, Clock, Sparkles, Moon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const infoData = [
  {
    title: "Pasaran Cycle",
    description: "5-day traditional market cycle",
    icon: Calendar,
    details: "Wage, Kliwon, Legi, Pahing, Pon - the sacred five-day cycle that governs traditional Javanese market days and spiritual practices.",
  },
  {
    title: "Wuku System",
    description: "30-week mystical calendar",
    icon: Clock,
    details: "A 210-day cycle consisting of 30 weeks (wuku), each with 7 days. This ancient system guides ceremonies and spiritual observances.",
  },
  {
    title: "Year Types",
    description: "8-year cosmic cycle",
    icon: Sparkles,
    details: "Alip, Ehe, Jimawal, Je, Dal, Be, Wawu, Jimakir - the eight sacred year types that repeat in eternal cosmic harmony.",
  },
  {
    title: "Windu Period",
    description: "Sacred 8-year cycles",
    icon: Moon,
    details: "Sancaya, Adi, Kuntara, Sengara - the four windu periods that create larger cosmic rhythms spanning generations.",
  },
];

export const InfoCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {infoData.map((info, index) => (
        <Card 
          key={info.title} 
          className="hover:glow transition-all duration-500 cursor-pointer group"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <info.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {info.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {info.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {info.details}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};