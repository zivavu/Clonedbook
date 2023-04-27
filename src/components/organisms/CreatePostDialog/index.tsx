import {
  Box,
  ButtonBase,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import { StyledPhotoAddButton, StyledPhotoDropArea, StyledRoot } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';
import { StyledDevider } from '../FullPagePhotosView/PostInfo/styles';
import { CreatePostDialogProps } from './types';

export default function CreatePostDialog({
  user,
  setIsOpen,
  sx,
  ...rootProps
}: CreatePostDialogProps) {
  const theme = useTheme();
  const placeholder = `What's on your mind, ${user.firstName}?`;
  return (
    <Dialog open onClose={() => setIsOpen(false)}>
      <StyledRoot sx={sx} {...rootProps}>
        <Box p={theme.spacing(2)} position='relative'>
          <Typography textAlign='center' variant='h6' fontWeight='500'>
            Create Post
          </Typography>
          <StyledDevider bottom='0' />
        </Box>
        <Stack padding={theme.spacing(2)}>
          <Stack direction='row' spacing={1}>
            <UserAvatar src={user.profilePicture} />
            <Box>
              <Typography fontWeight='400' variant='body1'>
                {user.firstName} {user.lastName}
              </Typography>
              <ButtonBase
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  padding: theme.spacing(0.2, 1),
                  borderRadius: '6px',
                  height: '24px',
                }}
              >
                <Icon icon='globe-africa' fontSize='12px' />
                <Typography ml={theme.spacing(0.5)} variant='body2' lineHeight='1rem'>
                  Public
                </Typography>
              </ButtonBase>
            </Box>
          </Stack>
          <TextField
            variant='outlined'
            multiline
            placeholder={placeholder}
            sx={{
              color: theme.palette.text.primary,
              mb: theme.spacing(3),
            }}
          />
          <Box
            sx={{
              width: '100%',
              height: '240px',
              p: theme.spacing(1),
              m: 'auto',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '6px',
            }}
          >
            <StyledPhotoAddButton>
              <StyledPhotoDropArea htmlFor='file-upload'>
                <input
                  type='file'
                  id='file-upload'
                  style={{ display: 'none' }}
                  accept='image/png, image/jpeg'
                />
                <Stack>
                  <Icon icon='file-circle-plus' fontSize='24' />
                  <Typography lineHeight='1.2rem' variant='subtitle1' mt={theme.spacing(1)}>
                    Add Photos
                  </Typography>
                  <Typography
                    lineHeight='0.8rem'
                    color={theme.palette.text.secondary}
                    variant='caption'
                  >
                    or drag and drop
                  </Typography>
                </Stack>
              </StyledPhotoDropArea>
            </StyledPhotoAddButton>
            <IconButton
              onClick={() => setIsOpen(false)}
              sx={{
                position: 'absolute',
                top: theme.spacing(1),
                right: theme.spacing(1),
                width: '36px',
                height: '36px',
              }}
            >
              <Icon icon='xmark' />
            </IconButton>
          </Box>
        </Stack>
      </StyledRoot>
    </Dialog>
  );
}
