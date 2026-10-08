'use client';
import { createContext, useContext, useEffect, useState } from 'react';
type Theme = 'light' | 'dark';
const Ctx = createContext<{ theme: Theme; toggle: () => void; setTheme: (t: Theme) => void }>({
  theme: 'light',
  toggle: () => {},
  setTheme: () => {},
});
export function useTheme() {
  return useContext(Ctx);
}
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    const s = localStorage.getItem('theme') as Theme | null;
    const m = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const t = s ?? (m ? 'dark' : 'light');
    setTheme(t);
  }, []);
  useEffect(() => {
    const r = document.documentElement;
    r.classList.remove('light', 'dark');
    r.classList.add(theme);
    r.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggle = () => setTheme((p) => (p === 'light' ? 'dark' : 'light'));
  return <Ctx.Provider value={{ theme, toggle, setTheme }}>{children}</Ctx.Provider>;
}
