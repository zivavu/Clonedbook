import { Stack, Typography, useTheme } from '@mui/material';

import getEntriesLength from '@/common/misc/objectManagment/getEntriesLength';
import InteractButton from '@/components/atoms/InteractButton';
import ActionButtons from '@/components/molecules/ActionButtons';
import ReactionsDisplayBox from '@/components/molecules/ReactionsDisplay';
import { StyledContentWrapper } from '../styles';
import { PostActionsProps } from './types';

export default function PostActions({
  post,
  refetchPost,
  handleShowMoreComments,
  sx,
  ...rootProps
}: PostActionsProps) {
  const theme = useTheme();
  const commentsLength = getEntriesLength(post.comments);

  return (
    <StyledContentWrapper sx={sx} {...rootProps}>
      <Stack direction='row' alignItems='center' mb={theme.spacing(1)}>
        <ReactionsDisplayBox
          reactions={post.reactions}
          sx={{ pr: theme.spacing(0.25), maxWidth: '75%' }}
        />
        <InteractButton
          sx={{ ml: 'auto' }}
          onClick={() => {
            handleShowMoreComments();
          }}>
          <Typography variant='subtitle2' color={theme.palette.text.secondary}>
            {commentsLength === 0
              ? ''
              : commentsLength > 1
              ? `${commentsLength} comments`
              : `${commentsLength} comment`}
          </Typography>
        </InteractButton>
      </Stack>

      <ActionButtons element={post} refetchElement={refetchPost} elementType='post' />
    </StyledContentWrapper>
  );
}
