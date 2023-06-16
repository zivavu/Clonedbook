import * as Pages from '@/components/pages';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import Page from '@/templates/Page';

export default function ProfilePage() {
  const { data: user } = useGetLoggedUserQuery({});

  if (!user) return null;
  return (
    <Page
      title={`${user.firstName} ${user.lastName} | Clonedbook`}
      description='Your profile page.'>
      <Pages.Profile userId={user?.id} />
    </Page>
  );
}
