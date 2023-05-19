import { useTheme } from '@mui/material';

import { StyledCommentInput, StyledRoot, StyledWrapper } from './styles';

import UserAvatar from '@/components/atoms/UserAvatar';
import { useFetchLoggedUserQuery } from '@/features/userAPI';
import { useState } from 'react';
import { CommentInputProps } from './types';

export default function CommentInput({ sx, ...rootProps }: CommentInputProps) {
  const { data: user } = useFetchLoggedUserQuery({});
  const theme = useTheme();
  const [commentText, setCommentText] = useState<string>('');
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <StyledWrapper>
        <UserAvatar
          size={30}
          sx={{ mr: theme.spacing(0.7) }}
          src={user?.picture}
          userId={user?.id}
        />
        <StyledCommentInput
          multiline
          fullWidth
          size='small'
          onChange={(e) => setCommentText(e.target.value)}
          placeholder='Write a comment...'>
          {commentText}
        </StyledCommentInput>
      </StyledWrapper>
    </StyledRoot>
  );
}
