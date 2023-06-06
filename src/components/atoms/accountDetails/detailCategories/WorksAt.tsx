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
      sx={sx}
      {...rootProps}
    />
  );
}
