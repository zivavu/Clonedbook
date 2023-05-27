import getDateFromTimestamp from '@/utils/dateManagment/getDateFromTimestamp';
import TextAccountDetail from '../AccountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function Birthdate({
  userData,
  iconSize,
  showPlaceholder,
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
