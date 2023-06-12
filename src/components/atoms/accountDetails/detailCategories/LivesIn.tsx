import updateUserAboutField from '@/common/firebase/user/updateUserAboutTextFields';
import TextAccountDetail from '../accountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function LivesIn({
  userData,
  iconSize,
  showPlaceholder,
  allowWrap = false,
  preventEdit,
  sx,
  ...rootProps
}: CategoryProps) {
  const { city, country } = userData.about;
  const publicAddres =
    city && country ? `${city}, ${country}` : city || country ? `${city}${country}` : null;
  const accountDetail: ITextAccountDetail = {
    label: 'Lives in',
    value: publicAddres,
    icon: 'home',
    placeholder: 'Address not specified',
    editPlaceholder: 'Add address',
  };

  return (
    <TextAccountDetail
      userId={userData.id}
      preventEdit={preventEdit}
      accountDetail={accountDetail}
      showPlaceholder={showPlaceholder}
      iconSize={iconSize}
      allowWrap={allowWrap}
      editHandler={(value: string) =>
        updateUserAboutField({ userId: userData.id, fieldName: 'address', value: value })
      }
      sx={sx}
      {...rootProps}
    />
  );
}
