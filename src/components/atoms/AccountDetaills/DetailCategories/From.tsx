import TextAccountDetail from '../AccountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function From({
  userData,
  iconSize,
  showPlaceholder,
  sx,
  ...rootProps
}: CategoryProps) {
  const { hometown } = userData.about;
  const accountDetail: ITextAccountDetail = {
    label: 'From',
    value: hometown || null,
    icon: 'location-dot',
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
