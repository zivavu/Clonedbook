import { MenuProps } from '@mui/material';

export interface CommentManageMenuProps extends MenuProps {
  handleOpenEditMode(): void;
  handleCommentDelete(): Promise<void>;
}
