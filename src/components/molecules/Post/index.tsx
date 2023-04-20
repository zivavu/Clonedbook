import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledContentWrapper, StyledRoot } from './styles';

import UserAvatar from '@/components/atoms/UserAvatar';
import ActionButtons from '../ActionButtons';
import CommentsDisplay from '../CommentsDisplay';
import ReactionsDisplay from '../ReactionsDisplay';
import PicturesDisplay from './PicturesDisplay';
import { PostProps } from './types';

export default function Post({ post, ...rootProps }: PostProps) {
  const { createdAt, id, owner, comments, postPictures, postText, reactions } = post;

  const theme = useTheme();

  const hasPictures = !!postPictures && postPictures[0] ? true : false;
  const hasText = !!postText ? true : false;
  const isTextLong = (postText && postText.length > 130) || hasPictures ? true : false;

  const postDate = new Date(createdAt.seconds * 1000);
  postDate.setMonth(postDate.getMonth() - 1);
  const fullDate = {
    month: Intl.DateTimeFormat('en-US', { month: 'long' }).format(postDate),
    day: postDate.getDate(),
    year: postDate.getFullYear(),
  };

  return (
    <StyledRoot {...rootProps}>
      <StyledContentWrapper sx={{ pt: theme.spacing(2) }}>
        <Stack direction='row' spacing={1} sx={{}}>
          <UserAvatar src={post.owner.profilePicture} />
          <Stack justifyContent='center'>
            <Typography fontWeight={500} variant='subtitle2' lineHeight='1rem'>
              {post.owner.firstName} {post.owner.lastName}
            </Typography>
            <Typography variant='caption'>
              {fullDate.month} {fullDate.day}, {fullDate.year}.
            </Typography>
          </Stack>
        </Stack>
        {hasText && (
          <Box sx={{ p: theme.spacing(1, 0) }}>
            {isTextLong ? (
              <Typography variant='body2'>{post.postText}</Typography>
            ) : (
              <Typography variant='h6' fontWeight='400' lineHeight='1.7rem'>
                {post.postText}
              </Typography>
            )}
          </Box>
        )}
      </StyledContentWrapper>
      {hasPictures ? <PicturesDisplay pictures={post.postPictures as string[]} /> : null}
      <StyledContentWrapper>
        <ReactionsDisplay
          reactions={post.reactions}
          exampleReactors={post.exampleReactors}
          sx={{ pr: theme.spacing(0.25) }}
        />
        <ActionButtons />
      </StyledContentWrapper>
      <StyledContentWrapper>
        <CommentsDisplay comments={post?.comments} user={post.owner} />
      </StyledContentWrapper>
    </StyledRoot>
  );
}
