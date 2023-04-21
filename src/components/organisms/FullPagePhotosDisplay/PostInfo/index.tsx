import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledDevider, StyledRoot } from './styles';

import UserAvatar from '@/components/atoms/UserAvatar';
import ActionButtons from '@/components/molecules/ActionButtons';
import Comments from '@/components/molecules/Comments';
import ReactionsDisplay from '@/components/molecules/ReactionsDisplay';
import RightSection from '../../NavBar/RightSection';
import { PostInfoProps } from './types';

export default function PostInfo({ post, ...rootProps }: PostInfoProps) {
  const theme = useTheme();
  const postDate = new Date(post.createdAt.seconds * 1000);
  postDate.setMonth(postDate.getMonth() - 1);
  const fullDate = {
    month: Intl.DateTimeFormat('en-US', { month: 'long' }).format(postDate),
    day: postDate.getDate(),
    year: postDate.getFullYear(),
  };
  return (
    <StyledRoot {...rootProps}>
      <Stack direction='row' width='100%' height='56px' justifyContent='flex-end'>
        <RightSection />
      </Stack>
      <StyledDevider />
      <Stack direction='row' mt={theme.spacing(2)} mb={theme.spacing(1)}>
        <UserAvatar src={post.owner.profilePicture} mr={theme.spacing(0.8)} />
        <Stack>
          <Typography variant='body2' fontWeight='400' lineHeight='1.2rem'>
            {post.owner.firstName} {post.owner.lastName}
          </Typography>
          <Typography variant='caption' lineHeight='1rem' sx={{ color: 'text.secondary' }}>
            {fullDate.month} {fullDate.day}, {fullDate.year}
          </Typography>
        </Stack>
      </Stack>
      <Box mb={theme.spacing(4)}>
        <Typography variant='body2'>{post.postText}</Typography>
      </Box>
      <Stack width='100%' direction='row' justifyContent='space-between'>
        <ReactionsDisplay reactions={post.reactions} displayCount />
        <Box display='flex'>
          <Typography pr={theme.spacing(1)} variant='caption' sx={{ color: 'text.secondary' }}>
            {post.comments?.length} comments
          </Typography>
          <Typography variant='caption' sx={{ color: 'text.secondary' }}>
            {Math.floor(Math.random() * 10)} shares
          </Typography>
        </Box>
      </Stack>
      <ActionButtons mt={theme.spacing(1)} mb={theme.spacing(4)} />
      <Comments comments={post.comments} />
    </StyledRoot>
  );
}
