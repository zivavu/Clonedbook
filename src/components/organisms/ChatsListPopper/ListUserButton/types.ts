import { IChat } from '@/types/chat';
import { ListItemButtonProps } from '@mui/material';

export interface ListUserProps extends ListItemButtonProps {
  chat: IChat;
  handlePopperClose(): void;
}
