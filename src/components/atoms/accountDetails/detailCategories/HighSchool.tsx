import TextAccountDetail from '../accountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function HighSchool({
  userData,
  iconSize,
  showPlaceholder,
  preventEdit,
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
    editPlaceholder: 'Add high school',
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
