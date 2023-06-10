import { IChat } from '@/types/chat';
import { BoxProps, ListItemButtonProps } from '@mui/material';

export interface ListUserProps extends ListItemButtonProps {
  chat: IChat;
}
