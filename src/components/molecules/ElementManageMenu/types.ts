import { TElementType } from '@/types/misc';
import { MenuProps } from '@mui/material';

export interface ElementManageMenuProps extends MenuProps {
  handleClose(): void;
  handleOpenEditMode(): void;
  handleElementDelete(): Promise<void>;
  type: TElementType | 'comment';
  ownerId: string;
  elementId: string;
}
