import Home from '@/components/pages/Home';
import { useFetchUserQuery } from '@/features/userAPI';
import Page from '@/templates/Page';

export default function Index() {
  return (
    <Page title='home'>
      <Home />
    </Page>
  );
}
