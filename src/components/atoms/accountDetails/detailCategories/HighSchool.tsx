import TextAccountDetail from '../accountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function HighSchool({
  userData,
  iconSize,
  showPlaceholder,
  sx,
  ...rootProps
}: CategoryProps) {
  const { highSchool } = userData.about;
  const school = highSchool || '';
  const accountDetail: ITextAccountDetail = {
    label: 'High school',
    value: school,
    icon: 'school',
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
