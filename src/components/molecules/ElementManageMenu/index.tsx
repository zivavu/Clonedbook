import { useAllUsersBasicInfoQuery } from '@/redux/services/allUsersPublicDataAPI';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useUserDataByIdQuery } from '@/redux/services/userDataAPI';
import updateUserSetPictures from '@/services/user/updateUserSetPictures';
import { CircularProgress, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { StyledMenuItem, StyledRoot } from './styles';
import { ElementManageMenuProps } from './types';

export default function ElementManageMenu({
  handleClose,
  handleOpenEditMode,
  handleElementDelete,
  elementId,
  type,
  ownerId,
  sx,
  ...rootProps
}: ElementManageMenuProps) {
  const theme = useTheme();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { refetch: refetchUser } = useUserDataByIdQuery(ownerId);
  const { refetch: refetchBasicInfo } = useAllUsersBasicInfoQuery({});
  const refetchUserData = async () => {
    await Promise.allSettled([refetchUser(), refetchBasicInfo()]);
  };

  async function handleDeleteClick() {
    setIsDeleteLoading(true);
    await handleElementDelete();
    setIsDeleteLoading(false);
  }

  async function handleSetProfilePicture() {
    if (!loggedUser) return;
    await updateUserSetPictures({
      newPictureId: elementId,
      loggedUser: loggedUser,
      type: 'account',
    });
    await refetchUserData();
    handleClose();
  }
  async function handleSetBackgroundPicture() {
    if (!loggedUser) return;
    await updateUserSetPictures({
      newPictureId: elementId,
      loggedUser: loggedUser,
      type: 'background',
    });
    await refetchUserData();
    handleClose();
  }

  if (!loggedUser || loggedUser.id !== ownerId) return null;
  return (
    <StyledRoot
      sx={sx}
      {...rootProps}
      disableScrollLock
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
      <StyledMenuItem onClick={handleOpenEditMode}>
        <Typography mr={1}>Edit</Typography>
      </StyledMenuItem>

      <StyledMenuItem onClick={handleDeleteClick}>
        <Typography>Delete</Typography>
        {isDeleteLoading && (
          <CircularProgress
            size={16}
            sx={{
              marginLeft: theme.spacing(1),
              color:
                theme.palette.mode === 'light'
                  ? theme.palette.common.black
                  : theme.palette.common.white,
            }}
          />
        )}
      </StyledMenuItem>
      {type === 'accountPicture' && (
        <StyledMenuItem onClick={handleSetProfilePicture}>
          <Typography>Set as profile picture</Typography>
        </StyledMenuItem>
      )}
      {type === 'backgroundPicture' && (
        <StyledMenuItem onClick={handleSetBackgroundPicture}>
          <Typography>Set as background picture</Typography>
        </StyledMenuItem>
      )}
    </StyledRoot>
  );
}
