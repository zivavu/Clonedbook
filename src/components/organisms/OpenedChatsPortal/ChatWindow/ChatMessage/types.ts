import { IMessage } from '@/types/message';
import { StackProps } from '@mui/material';

export interface ChatMessageProps extends StackProps {
  message: IMessage;
}
