import updateUserAboutField from '@/services/user/updateUserAboutTextFields';
import TextAccountDetail from '../accountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function Email({
  userData,
  iconSize,
  showPlaceholder,
  preventEdit,
  sx,
  ...rootProps
}: CategoryProps) {
  const { email } = userData.contact;
  const accountDetail: ITextAccountDetail = {
    label: 'Email',
    value: email,
    icon: 'envelope',
    placeholder: 'No email to show',
    editPlaceholder: 'Add email',
  };

  return (
    <TextAccountDetail
      userId={userData.id}
      accountDetail={accountDetail}
      showPlaceholder={showPlaceholder}
      preventEdit={preventEdit}
      iconSize={iconSize}
      editHandler={(value: string) =>
        updateUserAboutField({ userId: userData.id, fieldName: 'email', value: value })
      }
      sx={sx}
      {...rootProps}
    />
  );
}
