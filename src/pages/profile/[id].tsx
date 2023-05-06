import * as Pages from '@/components/pages';
import { useFetchUsersPublicDataQuery } from '@/features/usersPublicDataAPI';
import Page from '@/templates/Page';
import { useRouter } from 'next/router';

export default function ProfilePage() {
  const { data: users, isLoading, isError } = useFetchUsersPublicDataQuery({});
  const router = useRouter();
  const idParam = router.query.id as string;
  const user = users?.[idParam];
  return isLoading || isError || !user ? null : (
    <Page title={`${user?.firstName} ${user?.lastName} | Clonedbook`}>
      <Pages.Profile userId={idParam} />
    </Page>
  );
}
