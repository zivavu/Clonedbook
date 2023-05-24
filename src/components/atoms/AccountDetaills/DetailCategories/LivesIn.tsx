import TextAccountDetail from '../AccountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function LivesIn({
  userData,
  iconSize,
  showPlaceholder,
  sx,
  ...rootProps
}: CategoryProps) {
  const { city, country } = userData.about;
  const publicAddres =
    city && country ? `${city}, ${country}` : city || country ? `${city}${country}` : null;
  const accountDetail: ITextAccountDetail = {
    label: 'Lives in',
    value: publicAddres,
    icon: 'home',
    placeholder: 'Address not specified',
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
