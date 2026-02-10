import {
  ClickAwayListener,
  IconButton,
  Popper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';

import { StyledRoot } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import createUserChatMessage from '@/services/chats/createUserChatMessage';
import updateChatSettings from '@/services/chats/updateChatSettings';
import { useRef, useState } from 'react';
import ChatSettingsDialog from './ChatSettingsDialog';
import { MessageInputAreaProps } from './types';

export default function MessageInputArea({
  chatId,
  chatEmoji = '❤️',
  chatColor = '#0084ff',
  sx,
  ...rootProps
}: MessageInputAreaProps) {
  const theme = useTheme();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const [textValue, setTextValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async () => {
    if (!loggedUser || !textValue) return;
    await createUserChatMessage({ chatId, senderId: loggedUser.id, text: textValue });
    setTextValue('');
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setTextValue((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const onQuickEmojiClick = () => {
    if (!loggedUser) return;
    createUserChatMessage({ chatId, senderId: loggedUser.id, text: chatEmoji });
  };

  const handleOpenSettings = () => {
    setShowSettingsDialog(true);
  };

  const handleCloseSettings = () => {
    setShowSettingsDialog(false);
  };

  const handleSaveSettings = async (color: string, emoji: string) => {
    await updateChatSettings({
      chatId,
      chatEmoji: emoji,
      chatColor: color,
    });
    handleCloseSettings();
  };

  return (
    <StyledRoot direction='row' sx={sx} {...rootProps}>
      <IconButton
        sx={{ width: '30px', height: '30px' }}
        onClick={handleOpenSettings}
        ref={settingsButtonRef}>
        <Icon icon='gear' fontSize='20px' />
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
      <IconButton
        ref={emojiButtonRef}
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        sx={{ width: '34px', height: '34px', mr: 1 }}>
        <Icon icon='face-smile' style={{ fontSize: '20px' }} />
      </IconButton>
      {textValue ? (
        <IconButton sx={{ width: '34px', height: '34px' }} onClick={onSubmit}>
          <Icon icon='paper-plane' style={{ fontSize: '20px', color: chatColor }} />
        </IconButton>
      ) : (
        <IconButton sx={{ width: '34px', height: '34px' }} onClick={onQuickEmojiClick}>
          <Typography color={theme.palette.common.black} fontSize={22}>
            {chatEmoji}
          </Typography>
        </IconButton>
      )}
      <Popper
        open={showEmojiPicker}
        anchorEl={emojiButtonRef.current}
        placement='top-end'
        style={{ zIndex: 1300 }}>
        <ClickAwayListener onClickAway={() => setShowEmojiPicker(false)}>
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            theme={theme.palette.mode as Theme}
            skinTonesDisabled
          />
        </ClickAwayListener>
      </Popper>

      <ChatSettingsDialog
        currentEmoji={chatEmoji}
        currentColor={chatColor || '#0084ff'}
        open={showSettingsDialog}
        onClose={handleCloseSettings}
        onSave={handleSaveSettings}
      />
    </StyledRoot>
  );
}
