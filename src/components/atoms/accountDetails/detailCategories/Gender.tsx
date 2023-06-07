import updateUserAboutField from '@/common/firebase/updateData/user/updateUserAboutTextFields';
import { TUserSex } from '@/types/user';
import TextAccountDetail from '../accountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function Gender({
  userData,
  iconSize,
  showPlaceholder,
  preventEdit,
  sx,
  ...rootProps
}: CategoryProps) {
  const { sex } = userData.about;
  const accountDetail: ITextAccountDetail = {
    label: 'Gender',
    value: sex,
    icon: 'venus-mars',
    editPlaceholder: 'Add gender',
  };

  return (
    <TextAccountDetail
      userId={userData.id}
      accountDetail={accountDetail}
      showPlaceholder={showPlaceholder}
      preventEdit={preventEdit}
      iconSize={iconSize}
      editHandler={(value: TUserSex) =>
        updateUserAboutField({ userId: userData.id, fieldName: 'sex', value: value })
      }
      sx={sx}
      {...rootProps}
    />
  );
}
