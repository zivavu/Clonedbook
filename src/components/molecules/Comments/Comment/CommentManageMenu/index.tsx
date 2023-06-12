import { MenuItem, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { CommentManageMenuProps } from './types';

export default function CommentManageMenu({
  commentId,
  handleClose,
  handleOpenEditMode,
  handleCommentDelete,
  onClose,
  sx,
  ...rootProps
}: CommentManageMenuProps) {
  const theme = useTheme();

  return (
    <StyledRoot sx={sx} {...rootProps} disableScrollLock onClose={onClose}>
      <MenuItem onClick={() => handleOpenEditMode()}>Edit</MenuItem>
      <MenuItem onClick={handleCommentDelete}>Delete</MenuItem>
    </StyledRoot>
  );
}
