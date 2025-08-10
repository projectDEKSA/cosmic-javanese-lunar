import { Link, useLocation } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="font-semibold tracking-tight text-foreground">
          Javanese Calendar
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
                  Home
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
                  Monthly Calendar
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
