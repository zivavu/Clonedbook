import { ButtonBase, Stack, Typography, useTheme } from '@mui/material';

import { StyledButtonIcon, StyledButtonText, StyledPostTypeButton } from './styles';

import { LiveEventIcon, LiveVideoIcon, PhotoVideoIcon } from '@/assets/pageIcons';
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
            <ButtonBase
              sx={{
                backgroundColor: theme.palette.secondary.main,
                width: '100%',
                borderRadius: '20px',
                padding: theme.spacing(1, 2),
                justifyContent: 'flex-start',
              }}
              focusRipple
              onClick={handleOpenDialog}>
              <Typography color={theme.palette.text.secondary} variant='subtitle1' fontWeight={390}>
                What&apos;s on Your mind, {loggedUser.firstName}?
              </Typography>
            </ButtonBase>
          </Stack>
          <Stack direction='row' position='relative' pt={theme.spacing(1)}>
            <StyledPostTypeButton focusRipple onClick={handleOpenDialog}>
              <StyledButtonIcon width={24} height={24} alt='Live Video Icon' src={LiveVideoIcon} />
              <StyledButtonText>Live video</StyledButtonText>
            </StyledPostTypeButton>
            <StyledPostTypeButton focusRipple onClick={handleOpenDialog}>
              <StyledButtonIcon
                width={24}
                height={24}
                alt='Photo Video Icon'
                src={PhotoVideoIcon}
              />
              <StyledButtonText>Photo/video</StyledButtonText>
            </StyledPostTypeButton>
            <StyledPostTypeButton focusRipple onClick={handleOpenDialog}>
              <StyledButtonIcon width={24} height={24} alt='Live Event Icon' src={LiveEventIcon} />
              <StyledButtonText>Live event</StyledButtonText>
            </StyledPostTypeButton>
            <HorizontalContentDevider top='0' />
          </Stack>
        </Stack>
      </StyledPageTile>
    </>
  );
}
