import { AppBar, useTheme } from '@mui/material';

import { StyledContentContainer } from './styles';

import LeftSection from './LeftSection';
import MiddleSection from './MiddleSection';
import RightSection from './RightSection';
export default function NavBar() {
  const theme = useTheme();
  return (
    <AppBar sx={{ backgroundColor: theme.palette.secondary.light, position: 'sticky' }}>
      <StyledContentContainer>
        <LeftSection />
        <MiddleSection />
        <RightSection />
      </StyledContentContainer>
    </AppBar>
  );
}
