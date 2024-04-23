import { Color, ThemeProvider, createTheme } from "@mui/material";
import { blue, deepOrange } from "@mui/material/colors";
import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useMemo, useState } from "react";

type ThemeActions = {
  toggleThemeMode: () => void;
  setPrimaryColor: Dispatch<SetStateAction<Color>>;
}

export const CustomThemeContext = createContext<ThemeActions>({
  toggleThemeMode: () => { },
  setPrimaryColor: () => { },
});

const CustomThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [primaryColor, setPrimaryColor] = useState<Color>(blue);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: primaryColor,
        secondary: deepOrange,
      },
    }), [mode, primaryColor],
  );

  const themeValues = useMemo((): ThemeActions => {
    return {
      toggleThemeMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      },
      setPrimaryColor,
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