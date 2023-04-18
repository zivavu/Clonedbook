import Home from '@/components/pages/Home';
import { useFetchContactsQuery } from '@/features/contacts/contactsSlice';
import Page from '@/templates/Page';

export default function Index() {
  const { data, isFetching, isLoading } = useFetchContactsQuery({});

  return (
    <Page title='home'>
      <Home />
    </Page>
  );
}
