'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
  theme: 'light' | 'dark';
  background: string;
  accentColor: string;
}

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  background: string;
  setBackground: (bg: string) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
}

const defaultSettings: Settings = {
  theme: 'light',
  background: '/wallpapers/mountains.jpg',
  accentColor: 'blue',
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  background: defaultSettings.background,
  setBackground: () => {},
  accentColor: defaultSettings.accentColor,
  setAccentColor: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [background, setBackground] = useState(defaultSettings.background);
  const [accentColor, setAccentColor] = useState(defaultSettings.accentColor);

  // Load all settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      const settings: Settings = JSON.parse(savedSettings);
      setIsDarkMode(settings.theme === 'dark');
      setBackground(settings.background);
      setAccentColor(settings.accentColor);
    }
  }, []);

  // Save all settings to localStorage
  const saveSettings = (updates: Partial<Settings>) => {
    const savedSettings = localStorage.getItem('settings');
    const currentSettings: Settings = savedSettings 
      ? JSON.parse(savedSettings)
      : defaultSettings;
    
    const newSettings = {
      ...currentSettings,
      ...updates,
    };
    
    localStorage.setItem('settings', JSON.stringify(newSettings));
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveSettings({ theme: isDarkMode ? 'dark' : 'light' });
  }, [isDarkMode]);

  useEffect(() => {
    saveSettings({ background });
  }, [background]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor);
    saveSettings({ accentColor });
  }, [accentColor]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleDarkMode, 
      background, 
      setBackground,
      accentColor,
      setAccentColor
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 