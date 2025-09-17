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
        border border-pastel-sage dark:border-pastel-sage-dark
        bg-pastel-mint/50 dark:bg-pastel-mint-dark/50
        hover:bg-pastel-sage/70 dark:hover:bg-pastel-sage-dark/70
        text-tourism-forest dark:text-tourism-forest-dark
        transition-all duration-300 ease-smooth
        hover:scale-105 active:scale-95
        shadow-pastel dark:shadow-none
        backdrop-blur-sm
      "
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <Sun 
        className={`
          h-4 w-4 transition-all duration-500 ease-smooth
          ${theme === 'light' 
            ? 'rotate-0 scale-100 opacity-100' 
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