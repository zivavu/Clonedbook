import * as Pages from '@/components/pages';
import useGetUsersPublicData from '@/hooks/useGetUsersPublicData';
import Page from '@/templates/Page';
import { useRouter } from 'next/router';

export default function ProfilePage() {
  const router = useRouter();
  const idParam = router.query.id as string;
  const user = useGetUsersPublicData(idParam);
  return (
    <Page
      title={`${user?.firstName} ${user?.lastName} | Clonedbook`}
      description={`Profile page of ${user?.firstName} ${user?.lastName}`}>
      <Pages.Profile userId={idParam} />
    </Page>
  );
}
