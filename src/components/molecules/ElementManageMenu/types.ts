import { MenuProps } from '@mui/material';

export interface ElementManageMenuProps extends MenuProps {
  handleOpenEditMode(): void;
  handleElementDelete(): Promise<void>;
  ownerId: string;
}
