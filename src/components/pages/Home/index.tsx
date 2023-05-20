import ContactsSidebar from '@/components/organisms/ContactsSidebar';
import HomeWall from '@/components/organisms/HomeWall';
import ShortcutsSidebar from '@/components/organisms/ShortcutsSidebar';
import { StyledRoot } from './styles';
import { HomeProps } from './types';

export default function Home({ sx, ...rootProps }: HomeProps) {
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <ShortcutsSidebar />
      <HomeWall />
      <ContactsSidebar />
    </StyledRoot>
  );
}
