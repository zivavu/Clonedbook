import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledContentWrapper, StyledRoot } from './styles';

import InteractButton from '@/components/atoms/InteractButton';
import ActionButtons from '@/components/molecules/ActionButtons';
import Comments from '@/components/molecules/Comments';
import PostOwnerInfoDisplay from '@/components/molecules/PostOwnerInfoDisplay';
import ReactionsDisplay from '@/components/molecules/ReactionsDisplay';
import FullPagePostView from '@/components/organisms/FullPagePostView';
import { useFetchUserQuery } from '@/features/userAPI';
import { TLocalUserReaction } from '@/types/reaction';
import getEntriesLength from '@/utils/objectManagment/getEntriesLength';
import { useState } from 'react';
import PicturesDisplay from './PicturesDisplay';
import { FeedPostProps } from './types';

export default function FeedPost({ post, ...rootProps }: FeedPostProps) {
  const { data: user } = useFetchUserQuery({});
  const { id: postId, comments, postPictures, postText, reactions } = post;
  const theme = useTheme();
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);

  const [userReaction, setUserReaction] = useState<TLocalUserReaction>(
    reactions[user?.profileId || ''] || undefined,
  );

  const hasPictures = !!postPictures && postPictures[0] ? true : false;
  const hasText = !!postText ? true : false;
  const isTextLong = (postText && postText.length > 130) || hasPictures ? true : false;

  const commentsLength = getEntriesLength(comments);
  const commentsSlice = Object.values(comments).slice(0, 2);
  const exampleCommentsLength =
    commentsSlice[0]?.commentText?.length + (commentsSlice[1]?.commentText?.length || 0);
  const maxComments = exampleCommentsLength > 200 ? 1 : 2;
  const isMoreComments = getEntriesLength(comments) > maxComments;

  function handleShowMoreComments() {
    setIsFullViewOpen(true);
  }
  return (
    <>
      <StyledRoot {...rootProps}>
        <StyledContentWrapper sx={{ pt: theme.spacing(2) }}>
          <PostOwnerInfoDisplay owner={post.owner} createdAt={post.createdAt} />
          {hasText && (
            <Box sx={{ pt: theme.spacing(1) }}>
              {isTextLong ? (
                <Typography variant='body1'>{post.postText}</Typography>
              ) : (
                <Typography variant='h6' fontWeight='400' lineHeight='1.7rem'>
                  {post.postText}
                </Typography>
              )}
            </Box>
          )}
        </StyledContentWrapper>

        {hasPictures && (
          <Box mt={theme.spacing(1)}>
            <PicturesDisplay pictures={post.postPictures as string[]} postId={postId} />
          </Box>
        )}

        <StyledContentWrapper>
          <Stack direction='row' alignItems='center' mb={theme.spacing(1)}>
            <ReactionsDisplay
              reactions={post.reactions}
              userReaction={userReaction}
              sx={{ pr: theme.spacing(0.25) }}
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

          <ActionButtons
            post={post}
            userReaction={userReaction}
            setUserReaction={setUserReaction}
          />
        </StyledContentWrapper>
        <StyledContentWrapper>
          {isMoreComments && (
            <InteractButton sx={{ mb: theme.spacing(1) }} onClick={() => handleShowMoreComments()}>
              <Typography variant='subtitle2' color={theme.palette.text.secondary} fontWeight='500'>
                View more comments
              </Typography>
            </InteractButton>
          )}
          <Comments comments={comments} onlyUniqueUsers maxComments={maxComments} post={post} />
        </StyledContentWrapper>
      </StyledRoot>
      {isFullViewOpen && <FullPagePostView postId={post.id} setOpen={setIsFullViewOpen} />}
    </>
  );
}
