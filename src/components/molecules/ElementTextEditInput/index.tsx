import { Box, TextField, Typography, useTheme } from '@mui/material';

import { editUserElement } from '@/common/firebase/elements/editUsersElement';
import InteractButton from '@/components/atoms/InteractButton';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useState } from 'react';
import { ElementTextEditInputProps } from './types';

export default function ElementTextEditInput({
  element,
  elementType,
  handleCloseEditMode,
  refetchElement,
  sx,
  ...rootProps
}: ElementTextEditInputProps) {
  const theme = useTheme();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const { text } = element;

  const [postEditText, setPostEditText] = useState<string>(text || '');
  const [isEditFocused, setIsEditFocused] = useState(false);

  async function handleSubmit() {
    if (!loggedUser) return;
    await editUserElement({
      elementId: element.id,
      newElementText: postEditText,
      elementType,
      loggedUser,
    });
    await refetchElement();
    handleCloseEditMode();
  }
  return (
    <Box mb={1} sx={sx} {...rootProps}>
      <TextField
        value={postEditText}
        fullWidth
        multiline
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
          if (e.key === 'Escape') handleCloseEditMode();
        }}
        sx={{
          '& .MuiInputBase-root': {
            padding: theme.spacing(1, 2),
            fontSize: theme.typography.subtitle1.fontSize,
            backgroundColor: theme.palette.background.default,
          },
        }}
        onChange={(e) => setPostEditText(e.target.value)}
        onFocus={() => setIsEditFocused(true)}
        onBlur={() => setIsEditFocused(false)}
      />
      {isEditFocused ? (
        <Typography variant='body2'>Press Esc to cancel</Typography>
      ) : (
        <InteractButton onClick={handleCloseEditMode}>
          <Typography variant='body2' color={theme.palette.info.main}>
            Cancel
          </Typography>
        </InteractButton>
      )}
    </Box>
  );
}
