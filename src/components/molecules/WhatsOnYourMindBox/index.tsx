import { ButtonBase, Stack, Typography, useTheme } from '@mui/material';

import { StyledButtonIcon, StyledButtonText, StyledPostTypeButton, StyledRoot } from './styles';

import { LiveEventIcon, LiveVideoIcon, PhotoVideoIcon } from '@/assets/pageIcons';
import ContentDevider from '@/components/atoms/ContentDevider';
import UserAvatar from '@/components/atoms/UserAvatar';
import CreatePostDialog from '@/components/organisms/CreatePostDialog';
import { useState } from 'react';
import { WhatsOnYourMindBoxProps } from './types';

export default function WhatsOnYourMindBox({ user, ...rootProps }: WhatsOnYourMindBoxProps) {
  const theme = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  function handleOpenDialog() {
    setIsDialogOpen(true);
  }
  return (
    <>
      {isDialogOpen && <CreatePostDialog user={user} setIsOpen={setIsDialogOpen} />}
      <StyledRoot {...rootProps}>
        <Stack position='relative' spacing={1.5}>
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
              onClick={handleOpenDialog}>
              <Typography color={theme.palette.text.secondary} variant='subtitle1' fontWeight={390}>
                What&apos;s on Your mind, {user.firstName}?
              </Typography>
            </ButtonBase>
          </Stack>
          <Stack direction='row' position='relative' pt={theme.spacing(1)}>
            <StyledPostTypeButton onClick={handleOpenDialog}>
              <StyledButtonIcon width={24} height={24} alt='Live Video Icon' src={LiveVideoIcon} />
              <StyledButtonText>Live video</StyledButtonText>
            </StyledPostTypeButton>
            <StyledPostTypeButton onClick={handleOpenDialog}>
              <StyledButtonIcon
                width={24}
                height={24}
                alt='Photo Video Icon'
                src={PhotoVideoIcon}
              />
              <StyledButtonText>Photo/video</StyledButtonText>
            </StyledPostTypeButton>
            <StyledPostTypeButton onClick={handleOpenDialog}>
              <StyledButtonIcon width={24} height={24} alt='Live Event Icon' src={LiveEventIcon} />
              <StyledButtonText>Live event</StyledButtonText>
            </StyledPostTypeButton>
            <ContentDevider top='0' />
          </Stack>
        </Stack>
      </StyledRoot>
    </>
  );
}
