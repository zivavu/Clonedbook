import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import ContentDevider from '@/components/atoms/ContentDevider';
import ActionButtons from '@/components/molecules/ActionButtons';
import Comments from '@/components/molecules/Comments';
import PostOwnerInfoDisplay from '@/components/molecules/PostOwnerInfoDisplay';
import ReactionsDisplay from '@/components/molecules/ReactionsDisplay';
import getEntriesLength from '@/utils/objectManagment/getEntriesLength';
import isObjectEmpty from '@/utils/objectManagment/isObjectEmpty';
import RightSection from '../../NavBar/RightSection';
import { PostInfoProps } from './types';

export default function PostInfo({
  post,
  userReaction,
  setUserReaction,
  ...rootProps
}: PostInfoProps) {
  const theme = useTheme();
  const commentsLength = getEntriesLength(post.comments);
  return (
    <StyledRoot {...rootProps}>
      <Stack direction='row' width='100%' height='56px' justifyContent='flex-end'>
        <RightSection mr={theme.spacing(0.5)} />
      </Stack>
      <ContentDevider />
      <PostOwnerInfoDisplay
        owner={post.owner}
        createdAt={post.createdAt}
        mt={theme.spacing(2)}
        mb={theme.spacing(1)}
      />
      <Box mb={theme.spacing(4)}>
        <Typography variant='body1'>{post.postText}</Typography>
      </Box>
      <Stack width='100%' direction='row' justifyContent='space-between'>
        {!isObjectEmpty(post.reactions) && (
          <ReactionsDisplay
            userReaction={userReaction}
            reactions={post.reactions}
            displayCount
            displayNames={false}
          />
        )}
        <Box display='flex'>
          <Typography pr={theme.spacing(1)} variant='subtitle2' sx={{ color: 'text.secondary' }}>
            {commentsLength === 0
              ? ''
              : commentsLength > 1
              ? `${commentsLength} comments`
              : `${commentsLength} comment`}
          </Typography>
          <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
            {post.shareCount} shares
          </Typography>
        </Box>
      </Stack>
      <ActionButtons
        userReaction={userReaction}
        setUserReaction={setUserReaction}
        post={post}
        mt={theme.spacing(1)}
        mb={theme.spacing(4)}
      />
      <Comments post={post} comments={post.comments} maxComments='all' />
    </StyledRoot>
  );
}
