import { TextField, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import UserAvatar from '@/components/atoms/UserAvatar';
import { useState } from 'react';
import { CommentInputProps } from './types';

export default function CommentInput({ ...rootProps }: CommentInputProps) {
  const theme = useTheme();
  const [commentText, setCommentText] = useState<string>('');
  return (
    <StyledRoot {...rootProps}>
      <UserAvatar size={30} sx={{ mr: theme.spacing(0.7) }} />
      <TextField
        multiline
        fullWidth
        sx={{
          '& .MuiInputBase-root': {
            padding: theme.spacing(1, 1.5),
            fontSize: '0.9rem',
            lineHeight: '1.2rem',
          },
        }}
        size='small'
        onChange={(e) => setCommentText(e.target.value)}
        placeholder='Write a comment...'
      >
        {commentText}
      </TextField>
    </StyledRoot>
  );
}
