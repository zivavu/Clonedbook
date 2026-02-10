import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useState } from 'react';
import { CirclePicker } from 'react-color';
import { chatColors } from './chatColors';

interface ChatSettingsDialogProps {
  open: boolean;
  onClose: () => void;
  currentEmoji: string;
  currentColor: string;
  onSave: (color: string, emoji: string) => void;
}

interface MockChatWindowProps {
  color: string;
  emoji: string;
}

export default function ChatSettingsDialog({
  open,
  onClose,
  currentEmoji,
  currentColor,
  onSave,
}: ChatSettingsDialogProps) {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedColor, setSelectedColor] = useState(currentColor);
  const [selectedEmoji, setSelectedEmoji] = useState(currentEmoji || '❤️');

  const handleSave = () => {
    onSave(selectedColor || '#0084ff', selectedEmoji);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='xs'
      slotProps={{ paper: { sx: { m: 1, width: '100%', borderRadius: 3, overflow: 'hidden' } } }}>
      <MockChatWindow color={selectedColor} emoji={selectedEmoji} />

      <DialogContent sx={{ p: 0 }}>
        <Stack spacing={0}>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant='fullWidth'
            sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
            <Tab label='Emoji' sx={{ fontWeight: 600 }} />
            <Tab label='Color' sx={{ fontWeight: 600 }} />
          </Tabs>

          <Box sx={{ height: 450, bgcolor: 'background.paper' }}>
            {activeTab === 0 && (
              <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <EmojiPicker
                  onEmojiClick={(e) => setSelectedEmoji(e.emoji || '❤️')}
                  theme={theme.palette.mode as Theme}
                  skinTonesDisabled
                  width='100%'
                  height='450px'
                  previewConfig={{ showPreview: false }}
                />
              </Box>
            )}

            {activeTab === 1 && (
              <Stack sx={{ height: '100%', width: '100%', p: 3, alignItems: 'center' }}>
                <CirclePicker
                  colors={chatColors}
                  color={selectedColor}
                  onChange={(color) => setSelectedColor(color.hex)}
                  width='100%'
                  circleSize={46}
                  circleSpacing={20}
                />
              </Stack>
            )}
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button onClick={onClose} color='inherit'>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant='contained'
          sx={{
            bgcolor: selectedColor,
            '&:hover': { bgcolor: selectedColor, filter: 'brightness(0.9)' },
            minWidth: 100,
          }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function MockChatWindow({ color, emoji }: MockChatWindowProps) {
  const theme = useTheme();

  const bubbleStyle = {
    borderRadius: 2,
    maxWidth: '70%',
    py: 1,
    px: 1.5,
    fontSize: '0.9rem',
    fontFamily: theme.typography.fontFamily,
  };

  return (
    <Box
      sx={{
        p: 2,
        pb: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        bgcolor: theme.palette.background.default,
      }}>
      <Stack direction='row' spacing={1} alignItems='flex-end'>
        <Avatar sx={{ width: 28, height: 28 }} />
        <Box
          sx={{
            ...bubbleStyle,
            bgcolor: theme.palette.action.hover,
            color: theme.palette.text.primary,
            borderBottomLeftRadius: 4,
          }}>
          How does this look?
        </Box>
      </Stack>

      <Box
        sx={{
          ...bubbleStyle,
          alignSelf: 'flex-end',
          bgcolor: color,
          color: '#fff',
          borderBottomRightRadius: 4,
        }}>
        I love this color!
      </Box>

      <Stack direction='row' alignItems='center' spacing={1} sx={{ mt: 1, pt: 1 }}>
        <Box
          sx={{
            flex: 1,
            height: 36,
            bgcolor: theme.palette.action.hover,
            borderRadius: 20,
            px: 2,
            display: 'flex',
            alignItems: 'center',
          }}>
          <Typography variant='body2' color='text.disabled'>
            Aa
          </Typography>
        </Box>
        <Typography fontSize={26} sx={{ cursor: 'pointer', lineHeight: 1 }}>
          {emoji}
        </Typography>
      </Stack>
    </Box>
  );
}
