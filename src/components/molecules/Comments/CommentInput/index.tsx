import { SxProps, Theme, useTheme } from '@mui/material';

import { StyledCommentInput, StyledRoot, StyledWrapper } from './styles';

import UserAvatar from '@/components/atoms/UserAvatar';
import { useFetchLoggedUserQuery } from '@/redux/services/userAPI';
import { useState } from 'react';
import { CommentInputProps } from './types';

export default function CommentInput({ sx, mode, ...rootProps }: CommentInputProps) {
  const { data: user } = useFetchLoggedUserQuery({});
  const theme = useTheme();
  const [commentText, setCommentText] = useState<string>('');

  let modeSx: SxProps<Theme>;
  switch (mode) {
    case 'post':
      modeSx = { p: theme.spacing(2, 0), position: 'sticky', bottom: 0 };
      break;
    case 'picture':
      modeSx = { p: theme.spacing(1, 0), position: 'sticky', bottom: 0 };
      break;
    case 'feed':
      modeSx = { pb: theme.spacing(1) };
      break;
    default:
      modeSx = { pb: theme.spacing(1) };
  }
  return (
    <StyledRoot sx={{ ...modeSx, ...sx }} {...rootProps}>
      <StyledWrapper>
        <UserAvatar size={30} sx={{ mr: theme.spacing(0.7) }} userId={user?.id} />
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
