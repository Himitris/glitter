// Créez un nouveau fichier src/contexts/ThemeContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type ThemeType = 'dark';

interface ThemeContextProps {
  theme: ThemeType;
  gradientIntensity: number;
  setGradientIntensity: (intensity: number) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme] = useState<ThemeType>('dark');
  const [gradientIntensity, setGradientIntensity] = useState(70);

  useEffect(() => {
    // Appliquer l'intensité du gradient aux variables CSS
    document.documentElement.style.setProperty('--gradient-opacity', `${gradientIntensity / 100}`);
  }, [gradientIntensity]);

  return (
    <ThemeContext.Provider value={{ theme, gradientIntensity, setGradientIntensity }}>
      {children}
    </ThemeContext.Provider>
  );
};