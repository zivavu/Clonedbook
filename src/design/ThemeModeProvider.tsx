import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { useTheme } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';
import { getDesignTokens } from './theme';

export default function ThemeModeProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(getDesignTokens('dark'));

  useEffect(() => {
    setCurrentTheme(getDesignTokens(resolvedTheme === 'dark' ? 'dark' : 'light'));
  }, [resolvedTheme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
