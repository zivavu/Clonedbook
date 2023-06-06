import TextAccountDetail from '../accountDetailItems/TextAccountDetail';
import { CategoryProps, ITextAccountDetail } from '../types';

export default function JobTitle({
  userData,
  iconSize,
  showPlaceholder,
  preventEdit,
  sx,
  ...rootProps
}: CategoryProps) {
  const { jobTitle } = userData.about;
  const accountDetail: ITextAccountDetail = {
    label: 'Job title',
    value: jobTitle || null,
    icon: 'user-tie',
    placeholder: 'Title not specified',
    editPlaceholder: 'Add job title',
  };
  return (
    <TextAccountDetail
      userId={userData.id}
      preventEdit={preventEdit}
      accountDetail={accountDetail}
      showPlaceholder={showPlaceholder || false}
      iconSize={iconSize}
      sx={sx}
      {...rootProps}
    />
  );
}
