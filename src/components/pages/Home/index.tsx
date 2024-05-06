import ContactsSidebar from '@/components/molecules/ContactsSidebar';
import HomeWall from '@/components/organisms/HomeWall';
import ShortcutsSidebar from '@/components/organisms/ShortcutsSidebar';
import { BoxProps } from '@mui/material';
import { StyledRoot } from './styles';

export default function HomePage({ sx, ...rootProps }: BoxProps) {
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <ShortcutsSidebar />
      <HomeWall />
      <ContactsSidebar />
    </StyledRoot>
  );
}
