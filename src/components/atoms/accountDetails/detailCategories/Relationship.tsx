import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import TextAccountDetail from '../accountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function Relationship({
  userData,
  iconSize,
  showPlaceholder,
  preventEdit,
  sx,
  ...rootProps
}: CategoryProps) {
  const { relationship } = userData.about;
  const partner = useGetUserBasicInfo(relationship?.partnerId || '');
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
    editPlaceholder: 'Add relationship info',
  };
  return (
    <TextAccountDetail
      userId={userData.id}
      accountDetail={accountDetail}
      showPlaceholder={showPlaceholder}
      editHandler={async () => {}}
      preventEdit={true}
      iconSize={iconSize}
      sx={sx}
      {...rootProps}
    />
  );
}

// Export a helper function to use in AccountDetailCategory
export function getRelationshipDetailConfig() {
  // This is just a placeholder for the AccountDetailCategory
  // The actual rendering will be handled by the Relationship component
  return {
    accountDetail: {
      icon: 'heart',
      label: 'Relationship',
      value: null,
      placeholder: 'No relationship info to show',
      editPlaceholder: 'Add relationship info',
    },
    editHandler: async () => Promise.resolve(),
    useCustomComponent: true, // Signal to use the custom component instead
  };
}
