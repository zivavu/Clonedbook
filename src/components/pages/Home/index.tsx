import ContactsSidebar from '@/components/organisms/ContactsSidebar';
import HomeWall from '@/components/organisms/HomeWall';
import ShortcutsSidebar from '@/components/organisms/ShortcutsSidebar';
import { StyledRoot } from './styles';
import { HomeProps } from './types';

export default function Home({ ...rootProps }: HomeProps) {
  return (
    <StyledRoot {...rootProps}>
      <ShortcutsSidebar />
      <HomeWall />
      <ContactsSidebar />
    </StyledRoot>
  );
}
