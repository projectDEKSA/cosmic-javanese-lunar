import { Sun, Moon, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

interface ThemeLanguageToggleProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export const ThemeLanguageToggle = ({ theme, onThemeToggle }: ThemeLanguageToggleProps) => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: 'en' | 'id') => {
    setLanguage(lang);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onThemeToggle}
        className="inline-flex items-center gap-2"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="inline-flex items-center gap-2"
            aria-label="Change language"
          >
            <Globe size={16} />
            <span className="text-xs font-medium">{language.toUpperCase()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
            <span className="font-medium">EN</span>
            <span className="ml-2 text-muted-foreground">English</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleLanguageChange('id')}>
            <span className="font-medium">ID</span>
            <span className="ml-2 text-muted-foreground">Bahasa Indonesia</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};