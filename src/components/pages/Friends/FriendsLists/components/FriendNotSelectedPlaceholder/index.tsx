import { Stack, StackProps, Typography, useTheme } from '@mui/material';

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
