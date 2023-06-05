import * as Pages from '@/components/pages';
import { useFetchLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import Page from '@/templates/Page';

export default function ProfilePage() {
  const { data: user } = useFetchLoggedUserQuery({});
  if (!user) return null;
  return (
    <Page
      title={`${user.firstName} ${user.lastName} | Clonedbook`}
      description='Your profile page.'>
      <Pages.Profile userId={user?.id} />
    </Page>
  );
}
