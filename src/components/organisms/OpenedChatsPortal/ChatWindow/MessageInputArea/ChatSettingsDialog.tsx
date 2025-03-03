import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';

interface ChatSettingsDialogProps {
  chatId: string;
  chatEmoji: string;
  chatColor: string;
  open: boolean;
  onClose: () => void;
  onSave: (emoji: string, color: string) => Promise<void>;
}

export default function ChatSettingsDialog({
  chatId,
  chatEmoji,
  chatColor,
  open,
  onClose,
  onSave,
}: ChatSettingsDialogProps) {
  const theme = useTheme();
  const [selectedEmoji, setSelectedEmoji] = useState(chatEmoji);
  const [selectedColor, setSelectedColor] = useState(chatColor);

  useEffect(() => {
    if (open) {
      setSelectedEmoji(chatEmoji);
      setSelectedColor(chatColor);
    }
  }, [open, chatEmoji, chatColor]);

  const handleSettingsEmojiSelect = (emojiData: EmojiClickData) => {
    setSelectedEmoji(emojiData.emoji);
  };

  const handleSave = async () => {
    await onSave(selectedEmoji, selectedColor);
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
      <DialogTitle>Chat Settings</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <div>
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
              height='250px'
            />
          </div>

          <div>
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
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant='contained' sx={{ backgroundColor: selectedColor }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
