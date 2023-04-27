import { ButtonBase, Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import UserAvatar from '@/components/atoms/UserAvatar';
import CreatePostDialog from '@/components/organisms/CreatePostDialog';
import { useState } from 'react';
import { CreatePostProps } from './types';

export default function CreatePost({ user, ...rootProps }: CreatePostProps) {
  const theme = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      {isDialogOpen && <CreatePostDialog user={user} setIsOpen={setIsDialogOpen} />}
      <StyledRoot {...rootProps}>
        <Stack direction='row'>
          <UserAvatar src={user.profilePicture} mr={theme.spacing(1)} />
          <ButtonBase
            sx={{
              backgroundColor: theme.palette.secondary.main,
              width: '100%',
              borderRadius: '20px',
              padding: theme.spacing(1, 2),
              justifyContent: 'flex-start',
            }}
            onClick={() => setIsDialogOpen(true)}
          >
            <Typography color={theme.palette.text.secondary}>
              What&apos;s on Your mind, {user.firstName}?
            </Typography>
          </ButtonBase>
        </Stack>
      </StyledRoot>
    </>
  );
}
