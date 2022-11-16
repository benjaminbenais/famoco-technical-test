import { createContext, useState, useMemo, ReactNode, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface ColorModeContextType {
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {}
});

interface ThemeProps {
  children: ReactNode;
}

export const useColorMode = () => {
  return useContext(ColorModeContext);
};

const Theme = ({ children }: ThemeProps) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Theme;
