import TextAccountDetail from '../AccountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function Phone({
  userData,
  iconSize,
  showPlaceholder,
  sx,
  ...rootProps
}: CategoryProps) {
  const { phoneNumber } = userData.contact;
  const accountDetail: ITextAccountDetail = {
    label: 'Phone',
    value: phoneNumber,
    icon: 'phone',
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
