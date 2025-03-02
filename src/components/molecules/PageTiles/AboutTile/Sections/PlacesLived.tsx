import AccountDetailCategory from '@/components/atoms/accountDetails/AccountDetailCategory';
import { Stack, Typography } from '@mui/material';
import { SectionRoot, SectionTitle } from '../styles';
import { SectionProps } from '../types';

export default function PlacesLived({ profileData, ...rootProps }: SectionProps) {
  return (
    <SectionRoot {...rootProps}>
      <SectionTitle>Places lived</SectionTitle>
      <Stack spacing={1} pl={1} mt={1}>
        <Typography variant='subtitle1' fontWeight='bold'>
          Current town
        </Typography>
        <AccountDetailCategory detailType='livesIn' userData={profileData} />
        <Typography variant='subtitle1' fontWeight='bold' mt={2}>
          Hometown
        </Typography>
        <AccountDetailCategory detailType='bornin' userData={profileData} />
      </Stack>
    </SectionRoot>
  );
}
