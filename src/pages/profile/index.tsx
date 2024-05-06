import * as Pages from '@/components/pages';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import PageTemplate from '@/templates/Page';

export default function ProfilePage() {
  const { data: user } = useGetLoggedUserQuery({});

  if (!user) return null;
  return (
    <PageTemplate
      title={`${user.firstName} ${user.lastName} | Clonedbook`}
      description='Your profile page.'>
      <Pages.ProfilePage userId={user?.id} />
    </PageTemplate>
  );
}
