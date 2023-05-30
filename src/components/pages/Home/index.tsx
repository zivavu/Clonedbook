import ContactsSidebar from '@/components/molecules/ContactsSidebar';
import ShortcutsSidebar from '@/components/molecules/ShortcutsSidebar';
import HomeWall from '@/components/organisms/HomeWall';
import { BoxProps } from '@mui/material';
import { StyledRoot } from './styles';

export default function Home({ sx, ...rootProps }: BoxProps) {
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <ShortcutsSidebar />
      <HomeWall />
      <ContactsSidebar />
    </StyledRoot>
  );
}
