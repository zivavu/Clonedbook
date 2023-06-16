import { IconButton, TextField, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import createUserChatMessage from '@/services/chats/createUserChatMessage';
import { useState } from 'react';
import { MessageInputAreaProps } from './types';

export default function MessageInputArea({
  chatId,
  chatEmoji,
  sx,
  ...rootProps
}: MessageInputAreaProps) {
  const theme = useTheme();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const [textValue, setTextValue] = useState('');

  const onSubmit = async () => {
    if (!loggedUser || !textValue) return;
    await createUserChatMessage({ chatId, senderId: loggedUser.id, text: textValue });
    setTextValue('');
  };
  const onEmojiClick = () => {
    if (!loggedUser) return;
    createUserChatMessage({ chatId, senderId: loggedUser.id, text: chatEmoji });
  };

  return (
    <StyledRoot direction='row' sx={sx} {...rootProps}>
      <IconButton sx={{ width: '30px', height: '30px' }}>
        <Icon icon='plus-circle' fontSize='20px' />
      </IconButton>
      <TextField
        variant='outlined'
        fullWidth
        placeholder='Aa'
        multiline
        size='small'
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
          }
        }}
        sx={{
          backgroundColor: theme.palette.background.default,
          fontSize: theme.typography.subtitle2.fontSize,
          borderRadius: theme.spacing(2),
          marginLeft: theme.spacing(1),
        }}
      />
      {textValue ? (
        <IconButton sx={{ width: '34px', height: '34px' }}>
          <Icon
            icon='paper-plane'
            style={{
              fontSize: '20px',
              color: '#6699cc',
            }}
          />
        </IconButton>
      ) : (
        <IconButton sx={{ width: '34px', height: '34px' }} onClick={onEmojiClick}>
          <Typography color={theme.palette.common.black} fontSize={22}>
            {chatEmoji}
          </Typography>
        </IconButton>
      )}
    </StyledRoot>
  );
}
