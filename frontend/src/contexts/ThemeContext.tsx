// ThemeProvider.tsx
import { createContext, useContext, useMemo, useState } from "react";
import { theme as antdTheme } from "antd";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  themeMode: ThemeMode;
  isDarkMode: boolean;
  toggleTheme: () => void;
  algorithm: typeof antdTheme.defaultAlgorithm;
  theme: typeof lightTheme;
}

const lightTheme = {
  token: {
    colorPrimary: "#27ae60",
    colorBgBase: "#f9f9f9",
    colorTextBase: "#1a1a1a",
    colorTextSecondary: "#5c5c5c",
    colorBorder: "#d9d9d9",
    borderRadius: 8,
  },
  algorithm: antdTheme.defaultAlgorithm,
};

const darkTheme = {
  token: {
    colorPrimary: "#27ae60",
    colorBgBase: "#1a1a1a",
    colorTextBase: "#f0f0f0",
    colorTextSecondary: "#bbbbbb",
    colorBorder: "#444444",
    borderRadius: 8,
  },
  algorithm: antdTheme.darkAlgorithm,
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const contextValue = useMemo(() => {
    const isDarkMode = themeMode === "dark";
    return {
      themeMode,
      isDarkMode,
      toggleTheme,
      algorithm: isDarkMode ? darkTheme.algorithm : lightTheme.algorithm,
      theme: isDarkMode ? darkTheme : lightTheme,
    };
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
