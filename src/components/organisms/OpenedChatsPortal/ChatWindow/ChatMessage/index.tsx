import { Box, Typography, useTheme } from '@mui/material';
import emojiRegex from 'emoji-regex';
import { StyledRoot } from './styles';

import UserAvatar from '@/components/atoms/UserAvatar';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { ChatMessageProps } from './types';

export default function ChatMessage({ message, sx, ...rootProps }: ChatMessageProps) {
  const theme = useTheme();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const isOwner = message.senderId === loggedUser?.id;
  const regex = emojiRegex();
  const match = message.text.match(regex) || [];
  const isEmojiOnly = match.length === 1 && !/[ -~]/.test(message.text[0]);
  return (
    <StyledRoot
      direction='row'
      spacing={1}
      sx={{
        alignSelf: isOwner ? 'flex-end' : 'flex-start',
        ...sx,
      }}
      {...rootProps}>
      {!isOwner && (
        <UserAvatar
          size={30}
          userId={message.senderId}
          useLink={false}
          sx={{ alignSelf: 'flex-end' }}
        />
      )}
      <Box
        sx={{
          padding: isEmojiOnly ? theme.spacing(1, 0) : theme.spacing(1, 1.5),
          borderRadius: theme.spacing(2),
          backgroundColor: isEmojiOnly
            ? 'transparent'
            : isOwner
            ? '#6699cc'
            : theme.palette.secondary.dark,
          color: isOwner ? theme.palette.common.white : theme.palette.text.primary,
        }}>
        <Typography
          fontWeight={300}
          fontSize={isEmojiOnly ? '3rem' : theme.typography.subtitle2.fontSize}
          lineHeight={isEmojiOnly ? '3rem' : '1.2rem'}>
          {message.text}
        </Typography>
      </Box>
    </StyledRoot>
  );
}
