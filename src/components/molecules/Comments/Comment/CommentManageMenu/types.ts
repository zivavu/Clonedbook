import { MenuProps } from '@mui/material';

export interface CommentManageMenuProps extends MenuProps {
  commentId: string;
  handleClose(): void;
  handleOpenEditMode(): void;
  handleCommentDelete(): Promise<void>;
}
