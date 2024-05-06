import { Stack, Typography, useTheme } from '@mui/material';

import { StyledAddPostButton, StyledButtonText, StyledPostTypeButton } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';
import HorizontalContentDevider from '@/components/atoms/contentDeviders/HorizontalContentDevider';
import CreatePostDialog from '@/components/organisms/CreatePostDialog';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useState } from 'react';
import { StyledPageTile } from '../styles';
import { WriteSomethingTileProps } from './types';

export default function WriteSomethingTile({
  refetchPostById,
  sx,
  ...rootProps
}: WriteSomethingTileProps) {
  const theme = useTheme();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  function handleOpenDialog() {
    setIsDialogOpen(true);
  }
  if (!loggedUser) return null;
  return (
    <>
      {isDialogOpen && (
        <CreatePostDialog setIsOpen={setIsDialogOpen} refetchPostById={refetchPostById} />
      )}
      <StyledPageTile sx={{ pb: 1, ...sx }} {...rootProps}>
        <Stack position='relative' spacing={1.5}>
          <Stack direction='row'>
            <UserAvatar userId={loggedUser.id} mr={theme.spacing(1)} />
            <StyledAddPostButton
              data-testid='new-post-button'
              focusRipple
              onClick={handleOpenDialog}>
              <Typography color={theme.palette.text.secondary} variant='subtitle1' fontWeight={390}>
                What&apos;s on Your mind, {loggedUser.firstName}?
              </Typography>
            </StyledAddPostButton>
          </Stack>
          <Stack direction='row' position='relative' pt={theme.spacing(1)}>
            <StyledPostTypeButton focusRipple onClick={handleOpenDialog}>
              <Icon size='xl' icon='video' />

              <StyledButtonText>Live video</StyledButtonText>
            </StyledPostTypeButton>
            <StyledPostTypeButton focusRipple onClick={handleOpenDialog}>
              <Icon size='xl' icon='photo-film' />
              <StyledButtonText>Photo/video</StyledButtonText>
            </StyledPostTypeButton>
            <StyledPostTypeButton focusRipple onClick={handleOpenDialog}>
              <Icon size='xl' icon='people-group' />
              <StyledButtonText>Live event</StyledButtonText>
            </StyledPostTypeButton>
            <HorizontalContentDevider top='0' />
          </Stack>
        </Stack>
      </StyledPageTile>
    </>
  );
}
