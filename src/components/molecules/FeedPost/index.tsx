import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledContentWrapper, StyledRoot } from './styles';

import UserAvatar from '@/components/atoms/UserAvatar';
import { AddUsersButton } from '@/utils/generateRandomUsers';
import ActionButtons from '../ActionButtons';
import Comments from '../Comments';
import ReactionsDisplay from '../ReactionsDisplay';
import PicturesDisplay from './PicturesDisplay';
import { FeedPostProps } from './types';

export default function FeedPost({ post, ...rootProps }: FeedPostProps) {
  const {
    createdAt,
    id: postId,
    owner,
    comments,
    postPictures,
    postText,
    reactions,
    shareCount,
  } = post;
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
        <Stack direction='row' spacing={1}>
          <UserAvatar src={owner.profilePicture} />
          <Stack justifyContent='center'>
            <Typography fontWeight={500} variant='subtitle2' lineHeight='1rem'>
              {owner.firstName} {owner.lastName}
            </Typography>
            <Typography variant='caption'>
              {fullDate.month} {fullDate.day}, {fullDate.year}.
            </Typography>
          </Stack>
        </Stack>
        {hasText && (
          <Box sx={{ pt: theme.spacing(1) }}>
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
      {hasPictures ? (
        <Box mt={theme.spacing(1)}>
          <PicturesDisplay pictures={post.postPictures as string[]} postId={postId} />
        </Box>
      ) : null}
      <StyledContentWrapper>
        <Stack direction='row' alignItems='center' mb={theme.spacing(1)}>
          <ReactionsDisplay
            reactions={post.reactions}
            exampleReactors={post.exampleReactors}
            sx={{ pr: theme.spacing(0.25) }}
          />
          <Typography
            ml='auto'
            variant='caption'
            height='100%'
            color={theme.palette.text.secondary}
          >
            {comments.length === 0
              ? ''
              : comments.length > 1
              ? `${comments.length} comments`
              : `${comments.length} comment`}
          </Typography>
        </Stack>
        <ActionButtons />
      </StyledContentWrapper>
      <StyledContentWrapper>
        <Comments comments={post?.comments} onlyUniqueUsers/>
      </StyledContentWrapper>
    </StyledRoot>
  );
}
