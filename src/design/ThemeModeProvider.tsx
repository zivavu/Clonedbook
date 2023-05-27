import { RootState } from '@/redux/store';
import { ThemeProvider } from '@emotion/react';
import { ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getDesignTokens } from './theme';

export default function ThemeModeProvider({ children }: { children: ReactNode }) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = useMemo(() => {
    return getDesignTokens(mode);
  }, [mode]);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
