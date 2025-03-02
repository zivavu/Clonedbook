import getDateFromTimestamp from '@/common/misc/dateManagment/getDateFromTimestamp';
import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import updateUserAboutField from '@/services/user/updateUserAboutTextFields';
import updateUserBirthdate from '@/services/user/updateUserBirthDate';
import { ITimestamp } from '@/types/timestamp';
import { IUser, TUserSex } from '@/types/user';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Box, InputLabel, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Dayjs } from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import TextAccountDetail from './accountDetailItems/TextAccountDetail';
import { CategoryProps, CustomEditComponentProps, ITextAccountDetail } from './types';

export type DetailType =
  | 'birthdate'
  | 'bornin'
  | 'college'
  | 'email'
  | 'gender'
  | 'goesTo'
  | 'highSchool'
  | 'jobTitle'
  | 'livesIn'
  | 'phone'
  | 'relationship'
  | 'worksAt';

interface AccountDetailCategoryProps extends CategoryProps {
  detailType: DetailType;
}

// Define common type for edit handlers
type EditHandlerType<T> = (value: T) => Promise<void>;

// Define interface for detail configuration to ensure type safety
interface DetailConfig<T> {
  accountDetail: ITextAccountDetail;
  editHandler: EditHandlerType<T>;
  CustomEditComponent?: React.FC<CustomEditComponentProps<T>>;
  preventEdit?: boolean;
}

export default function AccountDetailCategory({
  detailType,
  userData,
  iconSize,
  showPlaceholder,
  preventEdit,
  sx,
  ...rootProps
}: AccountDetailCategoryProps) {
  const userId = userData.id;

  // Remove the special case for relationship
  const detailConfig = getDetailConfig(detailType, userData);

  if (!detailConfig) return null;

  return (
    <TextAccountDetail
      userId={userId}
      accountDetail={detailConfig.accountDetail}
      showPlaceholder={showPlaceholder}
      preventEdit={detailConfig.preventEdit || preventEdit}
      iconSize={iconSize}
      editHandler={detailConfig.editHandler}
      CustomEditComponent={detailConfig.CustomEditComponent}
      sx={sx}
      {...rootProps}
    />
  );
}

// Get the configuration for each detail type
function getDetailConfig(detailType: DetailType, userData: IUser): DetailConfig<any> | null {
  const userId = userData.id;

  switch (detailType) {
    case 'worksAt': {
      const { workplace } = userData.about;
      return {
        accountDetail: {
          label: 'Works at',
          value: workplace || null,
          icon: 'briefcase' as IconName,
          placeholder: 'No workplace to show',
          editPlaceholder: 'Add workplace',
        },
        editHandler: (value: string) =>
          updateUserAboutField({ userId, fieldName: 'workplace', value }),
      };
    }

    case 'jobTitle': {
      const { jobTitle } = userData.about;
      return {
        accountDetail: {
          label: 'Job title',
          value: jobTitle || null,
          icon: 'briefcase' as IconName,
          placeholder: 'No job title to show',
          editPlaceholder: 'Add job title',
        },
        editHandler: (value: string) =>
          updateUserAboutField({ userId, fieldName: 'jobTitle', value }),
      };
    }

    case 'college': {
      const { college } = userData.about;
      return {
        accountDetail: {
          label: 'College',
          value: college || null,
          icon: 'graduation-cap' as IconName,
          placeholder: 'No college to show',
          editPlaceholder: 'Add college',
        },
        editHandler: (value: string) =>
          updateUserAboutField({ userId, fieldName: 'college', value }),
      };
    }

    case 'highSchool': {
      const { highSchool } = userData.about;
      return {
        accountDetail: {
          label: 'High school',
          value: highSchool || null,
          icon: 'school' as IconName,
          placeholder: 'No high school to show',
          editPlaceholder: 'Add high school',
        },
        editHandler: (value: string) =>
          updateUserAboutField({ userId, fieldName: 'highSchool', value }),
      };
    }

    case 'livesIn': {
      const { city, country } = userData.about;
      const location = city && country ? `${city}, ${country}` : city || country || null;
      return {
        accountDetail: {
          label: 'Lives in',
          value: location,
          icon: 'house' as IconName,
          placeholder: 'No location to show',
          editPlaceholder: 'Add where you live',
        },
        editHandler: async (value: string) => {
          const parts = value.split(',').map((part) => part.trim());
          const cityValue = parts[0] || '';
          const countryValue = parts[1] || '';

          await updateUserAboutField({ userId, fieldName: 'city', value: cityValue });
          await updateUserAboutField({ userId, fieldName: 'country', value: countryValue });
          return Promise.resolve();
        },
      };
    }

    case 'bornin': {
      const { hometown } = userData.about;
      return {
        accountDetail: {
          label: 'Born in',
          value: hometown || null,
          icon: 'location-dot' as IconName,
          placeholder: 'No hometown to show',
          editPlaceholder: 'Add hometown',
        },
        editHandler: (value: string) =>
          updateUserAboutField({ userId, fieldName: 'hometown', value }),
      };
    }

    case 'email': {
      const { email } = userData.contact;
      return {
        accountDetail: {
          label: 'Email',
          value: email || null,
          icon: 'envelope' as IconName,
          placeholder: 'No email to show',
          editPlaceholder: 'Add email',
        },
        editHandler: (value: string) => updateUserAboutField({ userId, fieldName: 'email', value }),
      };
    }

    case 'phone': {
      const { phoneNumber } = userData.contact;
      return {
        accountDetail: {
          label: 'Phone',
          value: phoneNumber || null,
          icon: 'phone' as IconName,
          placeholder: 'No phone to show',
          editPlaceholder: 'Add phone',
        },
        editHandler: (value: string) =>
          updateUserAboutField({ userId, fieldName: 'phoneNumber', value }),
      };
    }

    case 'gender': {
      const { sex } = userData.about;
      const config: DetailConfig<TUserSex> = {
        accountDetail: {
          label: 'Gender',
          value: sex,
          icon: 'venus-mars' as IconName,
          editPlaceholder: 'Add gender',
        },
        editHandler: (value: TUserSex) => updateUserAboutField({ userId, fieldName: 'sex', value }),
        CustomEditComponent: CustomGenderPicker,
      };
      return config;
    }

    case 'birthdate': {
      const { birthDate: birthTimestamp } = userData.about;
      const birthDate = birthTimestamp ? getDateFromTimestamp(birthTimestamp.seconds) : null;
      const config: DetailConfig<ITimestamp> = {
        accountDetail: {
          label: 'Birth date',
          value: birthDate ? `${birthDate.month}, ${birthDate.day}, ${birthDate.year}` : null,
          icon: 'birthday-cake' as IconName,
          placeholder: `Didn't specified`,
          editPlaceholder: 'Add birth date',
        },
        editHandler: async (value: ITimestamp) => {
          await updateUserBirthdate({ userId, value });
          return Promise.resolve();
        },
        CustomEditComponent: CustomDatePicker,
      };
      return config;
    }

    case 'relationship': {
      const { relationship } = userData.about;

      const RelationshipDisplay = () => {
        const partner = useGetUserBasicInfo(relationship?.partnerId || '');

        if (partner && relationship?.status) {
          const partnerName = `${partner.firstName} ${partner.lastName}`;
          const relationshipLabel =
            relationship.status.charAt(0).toUpperCase() + relationship.status.slice(1);

          detailConfig.accountDetail.label = `${relationshipLabel} with`;
          detailConfig.accountDetail.value = partnerName;
          detailConfig.accountDetail.valueLink = `/profile/${partner.id}`;
        }

        return null;
      };

      const detailConfig: DetailConfig<any> = {
        accountDetail: {
          icon: 'heart' as IconName,
          label: 'Relationship status',
          value: relationship?.status || null,
          placeholder: 'No relationship info to show',
          editPlaceholder: 'Add relationship info',
        },
        editHandler: async () => Promise.resolve(),
        preventEdit: true,
      };

      // Only add the custom component if there's a partner ID
      if (relationship?.partnerId) {
        detailConfig.CustomEditComponent = RelationshipDisplay;
      }

      return detailConfig;
    }

    default:
      return null;
  }
}

// Custom component for gender selection
const CustomGenderPicker = ({
  setEditInputValue,
  initialValue,
}: CustomEditComponentProps<TUserSex>) => {
  const [gender, setGender] = useState<TUserSex | undefined>(initialValue);
  return (
    <>
      <InputLabel id='gender-select-label'>Gender</InputLabel>
      <Select
        MenuProps={{ disableScrollLock: true }}
        labelId='gender-select-label'
        id='gender-select'
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

// Custom component for date picking
const CustomDatePicker = ({ setEditInputValue }: CustomEditComponentProps<ITimestamp>) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <Box>
      {isMobile ? (
        <MobileDatePicker
          autoFocus
          disableFuture
          onChange={(value: Dayjs | null) => {
            if (!value) return;
            const timestamp = Timestamp.fromDate(value.toDate());
            setEditInputValue(timestamp);
          }}
        />
      ) : (
        <DesktopDatePicker
          open={isCalendarOpen}
          autoFocus
          onClose={() => setIsCalendarOpen(false)}
          disableFuture
          onChange={(value: Dayjs | null) => {
            if (!value) return;
            const timestamp = Timestamp.fromDate(value.toDate());
            setEditInputValue(timestamp);
          }}
          label='Birth date'
          sx={{
            width: '160px',
            '& .MuiInputBase-input': {
              userSelect: 'none !important',
              cursor: 'pointer',
              caretColor: 'transparent',
              '&::selection': {
                backgroundColor: 'transparent',
              },
            },
            '& fieldset': {
              border: `1px solid ${theme.palette.text.disabled}`,
            },
          }}
          slotProps={{
            textField: {
              onClick: () => {
                setIsCalendarOpen(true);
              },
            },
          }}
        />
      )}
    </Box>
  );
};
