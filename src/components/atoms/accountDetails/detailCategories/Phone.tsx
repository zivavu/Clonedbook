import updateUserAboutField from '@/common/firebase/updateData/user/updateUserAboutTextFields';
import TextAccountDetail from '../accountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function Phone({
  userData,
  iconSize,
  showPlaceholder,
  preventEdit,
  sx,
  ...rootProps
}: CategoryProps) {
  const { phoneNumber } = userData.contact;
  const accountDetail: ITextAccountDetail = {
    label: 'Phone',
    value: phoneNumber,
    icon: 'phone',
    placeholder: 'No phone number to show',
    editPlaceholder: 'Add phone number',
  };

  return (
    <TextAccountDetail
      userId={userData.id}
      accountDetail={accountDetail}
      showPlaceholder={showPlaceholder}
      preventEdit={preventEdit}
      iconSize={iconSize}
      editHandler={(value: string) =>
        updateUserAboutField({ userId: userData.id, fieldName: 'phoneNumber', value: value })
      }
      sx={sx}
      {...rootProps}
    />
  );
}
