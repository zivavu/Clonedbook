import { Box, TextField, Typography, useTheme } from '@mui/material';

import { editUserElement } from '@/common/firebase/elements/editUsersElement';
import InteractButton from '@/components/atoms/InteractButton';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useEffect, useRef, useState } from 'react';
import { PostTextAreaProps } from './types';

export default function PostTextArea({
  post,
  refetchPost,
  handleCloseEditMode,
  isInEditMode,
  sx,
  ...rootProps
}: PostTextAreaProps) {
  const theme = useTheme();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const { text, pictures } = post;
  const [postEditText, setPostEditText] = useState<string>(text || '');
  const postEditTextFieldRef = useRef<HTMLInputElement>(null);

  const [isEditFocused, setIsEditFocused] = useState(false);

  useEffect(() => {
    if (isInEditMode) {
      setPostEditText(text || '');
    }
  }, [isInEditMode, text]);

  const hasPictures = !!pictures && pictures[0] ? true : false;
  const hasText = !!text ? true : false;
  const isTextLong = (text && text.length > 130) || hasPictures ? true : false;

  async function handleSubmit() {
    if (!postEditText || !loggedUser) return;
    await editUserElement({
      elementId: post.id,
      newElementText: postEditText,
      elementType: 'post',
      loggedUser,
    });
    await refetchPost();
    handleCloseEditMode();
  }
  return (
    <Box pt={1} sx={sx} {...rootProps}>
      {isInEditMode ? (
        <Box mb={1}>
          <TextField
            inputRef={postEditTextFieldRef}
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
            <Typography variant='body2'>
              Press Esc to{' '}
              <InteractButton onClick={handleCloseEditMode}>
                <Typography variant='body2' color={theme.palette.info.main}>
                  cancel
                </Typography>
              </InteractButton>
            </Typography>
          ) : (
            <InteractButton onClick={handleCloseEditMode}>
              <Typography variant='body2' color={theme.palette.info.main}>
                Cancel
              </Typography>
            </InteractButton>
          )}
        </Box>
      ) : (
        hasText && (
          <>
            {isTextLong ? (
              <Typography variant='body1'>{text}</Typography>
            ) : (
              <Typography variant='h4' fontWeight='400' lineHeight='1.7rem'>
                {text}
              </Typography>
            )}
          </>
        )
      )}
    </Box>
  );
}
