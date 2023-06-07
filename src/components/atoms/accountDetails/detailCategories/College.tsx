import updateUserAboutField from '@/common/firebase/updateData/user/updateUserAboutTextFields';
import TextAccountDetail from '../accountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function College({
  userData,
  iconSize,
  showPlaceholder,
  preventEdit,
  sx,
  ...rootProps
}: CategoryProps) {
  const { college } = userData.about;
  const school = college || '';
  const accountDetail: ITextAccountDetail = {
    label: 'College',
    value: school,
    icon: 'graduation-cap',
    placeholder: 'No schools to show',
    editPlaceholder: 'Add college',
  };

  return (
    <TextAccountDetail
      userId={userData.id}
      accountDetail={accountDetail}
      showPlaceholder={showPlaceholder}
      preventEdit={preventEdit}
      iconSize={iconSize}
      editHandler={(value: string) =>
        updateUserAboutField({ userId: userData.id, fieldName: 'college', value: value })
      }
      sx={sx}
      {...rootProps}
    />
  );
}
