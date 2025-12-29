import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeToggle must be used within a ThemeProvider');
  }

  const { theme, setTheme } = themeContext;

  // Determine current effective theme
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md text-text-muted hover:text-text hover:bg-bg-subtle transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}

// Keep default export for backwards compatibility
export default ThemeToggle;
