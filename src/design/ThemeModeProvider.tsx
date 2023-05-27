import { RootState } from '@/redux/store';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getDesignTokens } from './theme';

export default function ThemeModeProvider({ children }: { children: ReactNode }) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = useMemo(() => {
    return getDesignTokens(mode);
  }, [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
