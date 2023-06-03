import useGetUsersPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import FamilyAccountDetail from '../AccountDetailItems/FamillyAccountDetail';
import { FamilyMemberProps } from '../types';

export default function FamilyMember({
  relativeId,
  kinshipType,
  pictureSize = 40,
  sx,
  ...rootProps
}: FamilyMemberProps) {
  const relative = useGetUsersPublicData(relativeId);
  if (!relative) return null;
  const isPartner =
    kinshipType === 'in relation' || kinshipType === 'engaged' || kinshipType === 'married';
  const kindship = kinshipType[0].toUpperCase() + kinshipType.slice(1);
  const label = isPartner
    ? `${kindship} with ${relative.firstName} ${relative.lastName}`
    : kindship;
  return (
    <FamilyAccountDetail
      label={label}
      user={relative}
      pictureSize={pictureSize}
      sx={sx}
      {...rootProps}
    />
  );
}
