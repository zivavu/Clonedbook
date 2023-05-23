import TextAccountDetail from '../AccountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function GoesTo({
  userData,
  iconSize,
  showPlaceholder,
  sx,
  ...rootProps
}: CategoryProps) {
  const { highSchool, college } = userData.about;
  const school = college || highSchool || '';
  const accountDetail: ITextAccountDetail = {
    label: 'Goes to',
    value: school,
    icon: 'graduation-cap',
    placeholder: 'No schools to show',
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
