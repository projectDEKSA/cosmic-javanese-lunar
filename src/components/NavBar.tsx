import { Link, useLocation } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/hooks/useTranslations";

interface NavBarProps {
  language: 'en' | 'id';
}

const NavBar = ({ language }: NavBarProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const { t } = useTranslations(language);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <nav className="container mx-auto flex h-14 items-center justify-between px-4 gap-4 sm:gap-6">
        <Link to="/" className="flex items-center gap-2" aria-label="Javanese Calendar Home">
          <img src="/logo.png" alt="Javanese Calendar logo" className="h-7 w-7 filter dark:invert" loading="eager" decoding="async" />
          <span className="sr-only">{t('heroTitle')}</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className={cn(
                    "px-3 py-1.5 rounded-md transition-colors",
                    isActive("/") ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {t('converter')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/month"
                  className={cn(
                    "px-3 py-1.5 rounded-md transition-colors",
                    isActive("/month") ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {t('calendar')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  );
};

export default NavBar;
