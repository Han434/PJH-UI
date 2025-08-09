// ThemeContext.js
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { lightTheme, darkTheme } from './theme';

const ThemeToggleContext = createContext();

export const useThemeToggle = () => useContext(ThemeToggleContext);

const THEME_KEY = 'app_theme_mode'; // for localStorage

export const ThemeToggleProvider = ({ children }) => {
  const getInitialTheme = () => {
    const stored = localStorage.getItem(THEME_KEY);
    return stored === 'light' ? 'light' : 'dark'; // default to dark
  };

  const [mode, setMode] = useState(getInitialTheme);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(THEME_KEY, mode);
  }, [mode]);

  // Listen to theme changes in other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === THEME_KEY && e.newValue) {
        setMode(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeToggleContext.Provider value={{ toggleTheme, mode, theme }}>
      {children}
    </ThemeToggleContext.Provider>
  );
};