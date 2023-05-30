import { AppBar, useTheme } from '@mui/material';

import { StyledContentContainer } from './styles';

import LeftSection from './LeftSection';
import MiddleSection from './MiddleSection';
import RightSection from './RightSection';
export const NAVBAR_HEIGHT = '56px';
export default function NavBar() {
  const theme = useTheme();
  return (
    <AppBar
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[9],
        position: 'sticky',
        maxWidth: '100vw',
        height: NAVBAR_HEIGHT,
      }}>
      <StyledContentContainer>
        <LeftSection />
        <MiddleSection />
        <RightSection />
      </StyledContentContainer>
    </AppBar>
  );
}
