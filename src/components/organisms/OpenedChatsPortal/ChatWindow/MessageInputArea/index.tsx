import {
  Box,
  Button,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Popper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { CirclePicker } from 'react-color';

import { StyledRoot } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import createUserChatMessage from '@/services/chats/createUserChatMessage';
import updateChatSettings from '@/services/chats/updateChatSettings';
import { useRef, useState } from 'react';
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
  const [selectedEmoji, setSelectedEmoji] = useState(chatEmoji);
  const [selectedColor, setSelectedColor] = useState<string>(chatColor);
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
    setSelectedEmoji(chatEmoji);
    setSelectedColor(chatColor);
    setShowSettingsDialog(true);
  };

  const handleCloseSettings = () => {
    setShowSettingsDialog(false);
  };

  const handleSaveSettings = async () => {
    await updateChatSettings({
      chatId,
      chatEmoji: selectedEmoji,
      chatColor: selectedColor,
    });
    handleCloseSettings();
  };

  const handleSettingsEmojiSelect = (emojiData: EmojiClickData) => {
    setSelectedEmoji(emojiData.emoji);
  };

  const colors = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
  ];

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

      {/* Chat Settings Dialog */}
      <Dialog open={showSettingsDialog} onClose={handleCloseSettings} fullWidth maxWidth='xs'>
        <DialogTitle>Chat Settings</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Box>
              <Typography variant='subtitle1' sx={{ mb: 1 }}>
                Chat Color
              </Typography>
              <Stack alignItems='center'>
                <CirclePicker
                  colors={colors}
                  color={selectedColor}
                  onChange={(color) => setSelectedColor(color.hex)}
                  width='100%'
                />
              </Stack>
              <Box
                sx={{
                  width: '100%',
                  height: '40px',
                  marginTop: 2,
                  backgroundColor: selectedColor,
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Typography color='#fff' fontWeight='bold'>
                  Selected Color
                </Typography>
              </Box>
            </Box>
            <hr />
            <Box>
              <Typography variant='subtitle1' sx={{ mb: 1 }}>
                Chat Emoji
              </Typography>
              <TextField
                fullWidth
                variant='outlined'
                value={selectedEmoji}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Typography fontSize={22}>{selectedEmoji}</Typography>
                    </InputAdornment>
                  ),
                }}
              />
              <EmojiPicker
                onEmojiClick={handleSettingsEmojiSelect}
                theme={theme.palette.mode as Theme}
                skinTonesDisabled
                width='100%'
                style={{ minHeight: '350px' }}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSettings}>Cancel</Button>
          <Button
            onClick={handleSaveSettings}
            variant='contained'
            sx={{ backgroundColor: selectedColor }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </StyledRoot>
  );
}
