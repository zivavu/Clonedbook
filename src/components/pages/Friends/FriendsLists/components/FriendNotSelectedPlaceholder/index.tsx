import { Stack, StackProps, Typography, useTheme } from '@mui/material';

import { SelectProfileFromListPlaceholderIcon } from '@/assets/pageIcons';
import Image from 'next/image';

export default function FriendNotSelectedPlaceholder({ sx, ...rootProps }: StackProps) {
  const theme = useTheme();
  return (
    <Stack sx={sx} {...rootProps} width='100%' position='relative'>
      <Stack
        sx={{
          position: 'absolute',
          width: '90%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          alignItems: 'center',
        }}>
        <Image
          src={SelectProfileFromListPlaceholderIcon}
          width={120}
          height={120}
          alt='SelectProfileImage'
        />
        <Typography
          variant='h3'
          textAlign='center'
          fontWeight={600}
          color={theme.palette.text.secondary}>
          Select people&apos;s names to preview their profile.
        </Typography>
      </Stack>
    </Stack>
  );
}
