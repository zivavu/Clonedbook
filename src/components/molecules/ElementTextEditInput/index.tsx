import { Box, IconButton, OutlinedInput, Typography, useTheme } from '@mui/material';

import PaperPlaneRightIcon from '@/assets/PaperPlaneRightIcon';
import InteractButton from '@/components/atoms/InteractButton';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { editUserElement } from '@/services/elements/editUsersElement';
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
    <Box mb={1} sx={sx} {...rootProps} width='100%'>
      <OutlinedInput
        data-testid='edit-element-text-content'
        value={postEditText}
        fullWidth
        multiline
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
          if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            handleCloseEditMode();
          }
        }}
        sx={{
          padding: theme.spacing(1.5, 2),
          marginBottom: theme.spacing(0.2),
          fontSize: theme.typography.subtitle1.fontSize,
          backgroundColor: theme.palette.background.default,
        }}
        endAdornment={
          <IconButton
            data-testid='edit-element-submit'
            onClick={handleSubmit}
            sx={{
              height: '32px',
              width: '32px',
              display: postEditText.length > 0 ? 'flex' : 'none',
            }}>
            <PaperPlaneRightIcon color='info' sx={{ width: '20px', height: '20px' }} />
          </IconButton>
        }
        onChange={(e) => setPostEditText(e.target.value)}
        onFocus={() => setIsEditFocused(true)}
        onBlur={() => setIsEditFocused(false)}
      />
      <Box height='16px'>
        {isEditFocused ? (
          <Typography variant='body2'>Press Esc to cancel</Typography>
        ) : (
          <>
            <InteractButton onClick={handleCloseEditMode}>
              <Typography variant='body2' color={theme.palette.info.main}>
                Cancel
              </Typography>
            </InteractButton>
          </>
        )}
      </Box>
    </Box>
  );
}
