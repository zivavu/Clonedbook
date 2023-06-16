import updateUserAboutField from '@/services/user/updateUserAboutTextFields';
import TextAccountDetail from '../accountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function WorksAt({
  userData,
  iconSize,
  showPlaceholder,
  preventEdit,
  sx,
  ...rootProps
}: CategoryProps) {
  const { workplace } = userData.about;
  const accountDetail: ITextAccountDetail = {
    label: 'Works at',
    value: workplace || null,
    icon: 'briefcase',
    placeholder: 'No workplace to show',
    editPlaceholder: 'Add workplace',
  };
  return (
    <TextAccountDetail
      userId={userData.id}
      accountDetail={accountDetail}
      showPlaceholder={showPlaceholder}
      preventEdit={preventEdit}
      iconSize={iconSize}
      editHandler={(value: string) =>
        updateUserAboutField({ userId: userData.id, fieldName: 'workplace', value: value })
      }
      sx={sx}
      {...rootProps}
    />
  );
}
