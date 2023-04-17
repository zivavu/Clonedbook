import Home from '@/components/pages/Home';
import { useFetchContactsQuery } from '@/features/contacts/contactsSlice';
import Page from '@/templates/Page';

export default function Index() {
  const { data, isFetching, isLoading } = useFetchContactsQuery({
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
  });
  console.log(data);
  return (
    <Page title='home'>
      <Home />
    </Page>
  );
}
