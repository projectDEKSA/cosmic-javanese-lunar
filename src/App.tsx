import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import MonthlyCalendar from "./pages/MonthlyCalendar";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const AppContent = () => {
  const { language } = useLanguage();
  
  return (
    <BrowserRouter>
      <NavBar language={language} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/month" element={<MonthlyCalendar />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
