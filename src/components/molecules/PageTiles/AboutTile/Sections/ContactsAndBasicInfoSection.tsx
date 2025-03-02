import AccountDetailCategory from '@/components/atoms/accountDetails/AccountDetailCategory';
import { Stack, Typography } from '@mui/material';
import { SectionRoot, SectionTitle } from '../styles';
import { SectionProps } from '../types';

export default function ContactsAndBasicInfoSection({ profileData }: SectionProps) {
  return (
    <SectionRoot>
      <SectionTitle>Contact info</SectionTitle>
      <Stack pl={1} mt={1} spacing={1}>
        <AccountDetailCategory detailType='email' userData={profileData} />
        <AccountDetailCategory detailType='phone' userData={profileData} />
      </Stack>

      <Typography variant='subtitle1' fontWeight='bold' mt={2}>
        Basic info
      </Typography>
      <Stack pl={1} mt={1} spacing={1}>
        <AccountDetailCategory detailType='gender' userData={profileData} />
        <AccountDetailCategory detailType='birthdate' userData={profileData} />
      </Stack>
    </SectionRoot>
  );
}
