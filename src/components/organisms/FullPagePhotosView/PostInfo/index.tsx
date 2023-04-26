import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledDevider, StyledRoot } from './styles';

import UserAvatar from '@/components/atoms/UserAvatar';
import ActionButtons from '@/components/molecules/ActionButtons';
import Comments from '@/components/molecules/Comments';
import PostOwnerInfoDisplay from '@/components/molecules/PostOwnerInfoDisplay';
import ReactionsDisplay from '@/components/molecules/ReactionsDisplay';
import { getDateFromTimestamp } from '@/utils/getDateFromTimestamp';
import RightSection from '../../NavBar/RightSection';
import { PostInfoProps } from './types';

export default function PostInfo({ post, ...rootProps }: PostInfoProps) {
  const theme = useTheme();

  return (
    <StyledRoot {...rootProps}>
      <Stack direction='row' width='100%' height='56px' justifyContent='flex-end'>
        <RightSection mr={theme.spacing(0.5)} />
      </Stack>
      <StyledDevider />
      <PostOwnerInfoDisplay
        owner={post.owner}
        createdAt={post.createdAt}
        mt={theme.spacing(2)}
        mb={theme.spacing(1)}
      />
      <Box mb={theme.spacing(4)}>
        <Typography variant='body2'>{post.postText}</Typography>
      </Box>
      <Stack width='100%' direction='row' justifyContent='space-between'>
        {post.reactions.length > 0 && <ReactionsDisplay reactions={post.reactions} displayCount />}
        <Box display='flex'>
          <Typography pr={theme.spacing(1)} variant='caption' sx={{ color: 'text.secondary' }}>
            {post.comments.length === 0
              ? ''
              : post.comments.length > 1
              ? `${post.comments.length} comments`
              : `${post.comments.length} comment`}
          </Typography>
          <Typography variant='caption' sx={{ color: 'text.secondary' }}>
            {post.shareCount} shares
          </Typography>
        </Box>
      </Stack>
      <ActionButtons mt={theme.spacing(1)} mb={theme.spacing(4)} />
      <Comments comments={post.comments} maxComments='all' />
    </StyledRoot>
  );
}
