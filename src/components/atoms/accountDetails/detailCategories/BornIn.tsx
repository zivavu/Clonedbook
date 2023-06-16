import updateUserAboutField from '@/services/user/updateUserAboutTextFields';
import TextAccountDetail from '../accountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function BornIn({
  userData,
  iconSize,
  showPlaceholder,
  preventEdit,
  sx,
  ...rootProps
}: CategoryProps) {
  const { hometown } = userData.about;
  const accountDetail: ITextAccountDetail = {
    label: 'Born in',
    value: hometown || null,
    icon: 'location-dot',
    placeholder: 'Hometown not specified',
    editPlaceholder: 'Add hometown',
  };

  return (
    <TextAccountDetail
      userId={userData.id}
      accountDetail={accountDetail}
      preventEdit={preventEdit}
      showPlaceholder={showPlaceholder}
      iconSize={iconSize}
      editHandler={(value: string) =>
        updateUserAboutField({ userId: userData.id, fieldName: 'hometown', value: value })
      }
      sx={sx}
      {...rootProps}
    />
  );
}
