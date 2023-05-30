import * as Pages from '@/components/pages';
import { useFetchLoggedUserQuery } from '@/redux/services/userAPI';
import Page from '@/templates/Page';

export default function FriendsPage() {
  const { data: user, isLoading, isError } = useFetchLoggedUserQuery({});
  return isLoading || isError || !user?.id ? null : (
    <Page
      title={`${user.firstName} ${user.lastName} | Clonedbook`}
      description='Manage your friends requests, and search for people You know.'>
      <Pages.Friends />
    </Page>
  );
}
