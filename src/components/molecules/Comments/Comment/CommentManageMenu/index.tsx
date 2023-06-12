import { useTheme } from '@mui/material';

import { StyledMenuItem, StyledRoot } from './styles';

import { CommentManageMenuProps } from './types';

export default function CommentManageMenu({
  handleOpenEditMode,
  handleCommentDelete,
  onClose,
  sx,
  ...rootProps
}: CommentManageMenuProps) {
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
      <StyledMenuItem onClick={() => handleOpenEditMode()}>Edit</StyledMenuItem>
      <StyledMenuItem onClick={handleCommentDelete}>Delete</StyledMenuItem>
    </StyledRoot>
  );
}
