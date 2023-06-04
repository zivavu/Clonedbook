import useGetUserPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import TextAccountDetail from '../AccountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function Relationship({
  userData,
  iconSize,
  showPlaceholder,
  sx,
  ...rootProps
}: CategoryProps) {
  const { relationship } = userData.about;
  const partner = useGetUserPublicData(relationship?.partnerId || '');
  const partnerName = `${partner?.firstName} ${partner?.lastName}` || '';
  const relationshipLabel = !partner
    ? 'Relationship status'
    : (relationship?.status &&
        relationship?.status?.charAt(0).toUpperCase() + relationship?.status?.slice(1)) ||
      '';
  const accountDetail: ITextAccountDetail = {
    icon: 'heart',
    label: `${relationshipLabel} ${!!partner ? 'with' : ''}`,
    value: (!partner ? relationship?.status : partnerName) || '',
    valueLink: partner ? `/profile/${partner.id}` : undefined,
    placeholder: 'No relationship info to show',
  };
  return (
    <TextAccountDetail
      accountDetail={accountDetail}
      showPlaceholder={showPlaceholder}
      iconSize={iconSize}
      sx={sx}
      {...rootProps}
    />
  );
}
