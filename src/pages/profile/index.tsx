import * as Pages from '@/components/pages';
import { useFetchUserQuery } from '@/features/userAPI';
import Page from '@/templates/Page';

export default function ProfilePage() {
  const { data: user, isLoading, isError } = useFetchUserQuery({});
  return isLoading || isError || !user?.profileId ? null : (
    <Page title={`${user.firstName} ${user.lastName} | Clonedbook`}>
      <Pages.Profile userId={user?.profileId} />
    </Page>
  );
}
