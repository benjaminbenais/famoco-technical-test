import {
  createContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
  useContext
} from 'react';
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

const initColotMode = () => {
  const savedMode = localStorage.getItem('theme-mode');

  if (savedMode === 'light' || savedMode === 'dark') {
    return savedMode;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return prefersDark ? 'dark' : 'light';
};

const Theme = ({ children }: ThemeProps) => {
  const [mode, setMode] = useState<'light' | 'dark'>(initColotMode());

  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

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
