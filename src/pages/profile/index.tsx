import * as Pages from '@/components/pages';
import { useFetchLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import Page from '@/templates/Page';

export default function ProfilePage() {
  const { data: user, isLoading, isError } = useFetchLoggedUserQuery({});
  return isLoading || isError || !user?.id ? null : (
    <Page
      title={`${user.firstName} ${user.lastName} | Clonedbook`}
      description='Your profile page.'>
      <Pages.Profile userId={user?.id} />
    </Page>
  );
}
