import { Box, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import UserAvatar from '@/components/atoms/UserAvatar';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { ChatMessageProps } from './types';

export default function ChatMessage({ message, sx, ...rootProps }: ChatMessageProps) {
  const theme = useTheme();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const isOwner = message.senderId === loggedUser?.id;
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
          padding: theme.spacing(1, 1.5),
          borderRadius: theme.spacing(2),
          backgroundColor: isOwner ? '#6699cc' : theme.palette.secondary.dark,
          color: isOwner ? theme.palette.common.white : theme.palette.text.primary,
        }}>
        <Typography>{message.text}</Typography>
      </Box>
    </StyledRoot>
  );
}
