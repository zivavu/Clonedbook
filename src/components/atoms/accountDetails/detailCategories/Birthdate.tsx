import getDateFromTimestamp from '@/common/misc/dateManagment/getDateFromTimestamp';
import TextAccountDetail from '../accountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function Birthdate({
  userData,
  iconSize,
  showPlaceholder,
  preventEdit,
  sx,
  ...rootProps
}: CategoryProps) {
  const { birthDate: birthTimestamp } = userData.about;
  const birthDate = birthTimestamp ? getDateFromTimestamp(birthTimestamp.seconds) : null;
  const accountDetail: ITextAccountDetail = {
    label: 'Birth date',
    value: birthDate ? `${birthDate.month}, ${birthDate.day}, ${birthDate.year}` : null,
    icon: 'birthday-cake',
    placeholder: `Didn't specified`,
    editPlaceholder: 'Add birth date',
  };
  return (
    <TextAccountDetail
      userId={userData.id}
      preventEdit={preventEdit}
      accountDetail={accountDetail}
      showPlaceholder={showPlaceholder}
      iconSize={iconSize}
      sx={sx}
      {...rootProps}
    />
  );
}
