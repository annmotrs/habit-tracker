'use client';
import { createContext, useState } from 'react';

export interface IThemeContext {
  darkMode: boolean;
  toggleDarkMode: () => void;
  updateTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | {}>({});

const ThemeProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  function toggleDarkMode() {
    const isNewDark = darkMode ? 'no' : 'yes';
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', isNewDark);
  }

  function updateTheme() {
    const curTheme: string | null = localStorage.getItem('darkMode');
    if (curTheme === 'yes') {
      setDarkMode(true);
    }
  }

  const value = { darkMode, toggleDarkMode, updateTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
