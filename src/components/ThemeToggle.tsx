import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="sm"
      className="
        h-9 w-9 p-0 
        border border-border/60 dark:border-pastel-sage-dark
        bg-background/80 backdrop-blur-sm dark:bg-pastel-mint-dark/50
        hover:bg-accent/20 dark:hover:bg-pastel-sage-dark/70
        hover:border-accent/40 dark:hover:border-pastel-sage-dark
        text-foreground dark:text-tourism-forest-dark
        transition-all duration-300 ease-smooth
        hover:scale-105 active:scale-95
        shadow-lg shadow-primary/10 dark:shadow-none
        hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-none
      "
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <Sun 
        className={`
          h-4 w-4 transition-all duration-500 ease-smooth
          ${theme === 'light' 
            ? 'rotate-0 scale-100 opacity-100 text-accent' 
            : 'rotate-90 scale-0 opacity-0'
          }
        `} 
      />
      <Moon 
        className={`
          absolute h-4 w-4 transition-all duration-500 ease-smooth
          ${theme === 'dark' 
            ? 'rotate-0 scale-100 opacity-100' 
            : '-rotate-90 scale-0 opacity-0'
          }
        `} 
      />
    </Button>
  );
};

export default ThemeToggle;