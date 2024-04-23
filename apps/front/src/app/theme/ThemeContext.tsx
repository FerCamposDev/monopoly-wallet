import { ThemeProvider, createTheme } from "@mui/material";
import { FC, PropsWithChildren, createContext, useContext, useMemo, useState } from "react";

type ThemeActions = {
  toggleThemeMode: () => void;
}

export const CustomThemeContext = createContext<ThemeActions>({
  toggleThemeMode: () => { },
  // setPrimaryColor: (color: string) => {},
});

const CustomThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
      },
    }), [mode],
  );

  const themeValues = useMemo(() => {
    return {
      toggleThemeMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      },
    };
  }, []);

  return (
    <CustomThemeContext.Provider value={themeValues}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </CustomThemeContext.Provider>
  )
};

export const useThemeActions = () => {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error('Trying to use CustomThemeContext without CustomThemeProvider');
  }

  return context;
}

export default CustomThemeProvider;