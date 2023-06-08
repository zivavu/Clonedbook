import updateUserAboutField from '@/common/firebase/updateData/user/updateUserAboutTextFields';
import { TUserSex } from '@/types/user';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import TextAccountDetail from '../accountDetailItems/TextAccountDetail';
import { CategoryProps, CustomEditComponentProps, ITextAccountDetail } from '../types';

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
      editHandler={(value: TUserSex) =>
        updateUserAboutField({ userId: userData.id, fieldName: 'sex', value: value })
      }
      showPlaceholder={showPlaceholder}
      preventEdit={preventEdit}
      iconSize={iconSize}
      CustomEditComponent={CustomGenderPicker}
      sx={sx}
      {...rootProps}
    />
  );
}

const CustomGenderPicker = ({
  setEditInputValue,
  initialValue,
}: CustomEditComponentProps<TUserSex>) => {
  const [gender, setGender] = useState<TUserSex | undefined>(initialValue);
  return (
    <>
      <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
      <Select
        MenuProps={{ disableScrollLock: true }}
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={gender}
        label='Gender'
        onChange={(e) => {
          setGender(e.target.value as TUserSex);
          setEditInputValue(e.target.value as TUserSex);
        }}>
        <MenuItem value={'male' as TUserSex}>Male</MenuItem>
        <MenuItem value={'female' as TUserSex}>Female</MenuItem>
        <MenuItem value={'other' as TUserSex}>Other</MenuItem>
      </Select>
    </>
  );
};
