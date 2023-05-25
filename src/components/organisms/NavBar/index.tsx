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
        backgroundColor: theme.palette.secondary.light,
        boxShadow: theme.shadows[9],
        position: 'sticky',
        width: '100vw',
        height: NAVBAR_HEIGHT,
        paddingRight: '17px !important',
      }}>
      <StyledContentContainer>
        <LeftSection />
        <MiddleSection />
        <RightSection />
      </StyledContentContainer>
    </AppBar>
  );
}
