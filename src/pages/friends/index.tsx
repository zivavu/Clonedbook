import * as Pages from '@/components/pages';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import Page from '@/templates/Page';

export default function FriendsPage() {
  const { data: user } = useGetLoggedUserQuery({});
  if (!user?.id) return null;
  return (
    <Page
      title={`${user.firstName} ${user.lastName} | Clonedbook`}
      description='Manage your friends requests, and search for people You know.'>
      <Pages.Friends />
    </Page>
  );
}
