import TextAccountDetail from '../AccountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function WorksAt({
  userData,
  iconSize,
  showPlaceholder,
  sx,
  ...rootProps
}: CategoryProps) {
  const { workplace } = userData.about;
  const accountDetail: ITextAccountDetail = {
    label: 'Works at',
    value: workplace || null,
    icon: 'briefcase',
    placeholder: 'No workplace to show',
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
