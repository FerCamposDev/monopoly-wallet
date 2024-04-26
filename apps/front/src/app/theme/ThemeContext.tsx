import { Color, ThemeProvider, createTheme } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useMemo, useState } from "react";

type ThemeActions = {
  toggleThemeMode: () => void;
  setPrimaryColor: Dispatch<SetStateAction<Color>>;
  resetPrimaryColor: () => void;
}

export const CustomThemeContext = createContext<ThemeActions>({
  toggleThemeMode: () => { },
  setPrimaryColor: () => { },
  resetPrimaryColor: () => { },
});

const CustomThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [primaryColor, setPrimaryColor] = useState<Color>(blue);

  const resetPrimaryColor = () => {
    setPrimaryColor(blue);
  }

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: primaryColor,
        secondary: green,
      },
    }), [mode, primaryColor],
  );

  const themeValues = useMemo((): ThemeActions => {
    return {
      toggleThemeMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      },
      setPrimaryColor,
      resetPrimaryColor,
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