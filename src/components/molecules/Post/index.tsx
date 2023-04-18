import { Box, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import UserAvatar from '@/components/atoms/UserAvatar';
import { PostProps } from './types';

export default function Post({ post, ...rootProps }: PostProps) {
  const theme = useTheme();
  //@ts-ignore
  const postDate = new Date(post.createdAt.seconds * 1000);
  postDate.setMonth(postDate.getMonth() - 1);
  const fullDate = {
    month: Intl.DateTimeFormat('en-US', { month: 'long' }).format(postDate),
    day: postDate.getDate(),
    year: postDate.getFullYear(),
  };
  return (
    <StyledRoot {...rootProps}>
      <Box>
        <UserAvatar src={post.owner.profilePicture} />
        <Typography>
          {post.owner.firstName} {post.owner.lastName}
        </Typography>
        <Typography>
          {fullDate.month} {fullDate.day}, {fullDate.year}.
        </Typography>
      </Box>
      <Typography>{post.postText}</Typography>
    </StyledRoot>
  );
}
