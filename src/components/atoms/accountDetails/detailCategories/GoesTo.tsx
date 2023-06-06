import TextAccountDetail from '../accountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function GoesTo({
  userData,
  iconSize,
  showPlaceholder,
  preventEdit,
  sx,
  ...rootProps
}: CategoryProps) {
  const { highSchool, college } = userData.about;
  const school = college || highSchool || '';
  const accountDetail: ITextAccountDetail = {
    label: 'Studied at',
    value: school,
    icon: 'graduation-cap',
    placeholder: 'No schools to show',
    editPlaceholder: 'Add current school',
  };

  return (
    <TextAccountDetail
      userId={userData.id}
      accountDetail={accountDetail}
      showPlaceholder={showPlaceholder}
      preventEdit={preventEdit}
      iconSize={iconSize}
      sx={sx}
      {...rootProps}
    />
  );
}
