import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { CircularProgress, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { StyledMenuItem, StyledRoot } from './styles';
import { ElementManageMenuProps } from './types';

export default function ElementManageMenu({
  handleOpenEditMode,
  handleElementDelete,
  onClose,
  ownerId,
  sx,
  ...rootProps
}: ElementManageMenuProps) {
  const theme = useTheme();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  async function handleDeleteClick() {
    setIsDeleteLoading(true);
    await handleElementDelete();
    setIsDeleteLoading(false);
  }

  if (!loggedUser || loggedUser.id !== ownerId) return null;
  return (
    <StyledRoot
      sx={sx}
      {...rootProps}
      disableScrollLock
      onClose={onClose}
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
        <Typography>
          Delete
          {isDeleteLoading && (
            <CircularProgress
              size={16}
              sx={{
                color:
                  theme.palette.mode === 'light'
                    ? theme.palette.common.black
                    : theme.palette.common.white,
              }}
            />
          )}
        </Typography>
      </StyledMenuItem>
    </StyledRoot>
  );
}
