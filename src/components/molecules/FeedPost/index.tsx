import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledContentWrapper, StyledRoot } from './styles';

import StyledInteractButton from '@/components/atoms/StyledInteractButton';
import FullPagePostView from '@/components/organisms/FullPagePostView';
import { useFetchUserQuery } from '@/features/userAPI';
import { IReactionReference } from '@/types/reaction';
import { useState } from 'react';
import ActionButtons from '../ActionButtons';
import Comments from '../Comments';
import PostOwnerInfoDisplay from '../PostOwnerInfoDisplay';
import ReactionsDisplay from '../ReactionsDisplay';
import PicturesDisplay from './PicturesDisplay';
import { FeedPostProps } from './types';

export default function FeedPost({ post, ...rootProps }: FeedPostProps) {
  const { data: user } = useFetchUserQuery({});
  const { id: postId, comments, postPictures, postText, reactions } = post;
  const theme = useTheme();
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);

  const [userReaction, setUserReaction] = useState<IReactionReference | null>(
    post.reactions.find((reaction) => reaction.userId === user?.profileId) || null,
  );

  const hasPictures = !!postPictures && postPictures[0] ? true : false;
  const hasText = !!postText ? true : false;
  const isTextLong = (postText && postText.length > 130) || hasPictures ? true : false;

  function handleShowMoreComments() {
    setIsFullViewOpen(true);
  }

  const exampleCommentsLength =
    comments[0]?.commentText?.length + (comments[1]?.commentText?.length || 0);
  const maxComments = exampleCommentsLength > 200 ? 1 : 2;
  const isMoreComments = comments.length > maxComments;

  return (
    <>
      <StyledRoot {...rootProps}>
        <StyledContentWrapper sx={{ pt: theme.spacing(2) }}>
          <PostOwnerInfoDisplay owner={post.owner} createdAt={post.createdAt} />

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

        {hasPictures && (
          <Box mt={theme.spacing(1)}>
            <PicturesDisplay pictures={post.postPictures as string[]} postId={postId} />
          </Box>
        )}

        <StyledContentWrapper>
          <Stack direction='row' alignItems='center' mb={theme.spacing(1)}>
            {reactions.length > 0 && (
              <ReactionsDisplay
                reactions={post.reactions}
                exampleReactors={post.exampleReactors}
                userReaction={userReaction}
                sx={{ pr: theme.spacing(0.25) }}
              />
            )}
            <StyledInteractButton
              sx={{ ml: 'auto' }}
              onClick={() => {
                handleShowMoreComments();
              }}
            >
              <Typography variant='caption' color={theme.palette.text.secondary}>
                {comments.length === 0
                  ? ''
                  : comments.length > 1
                  ? `${comments.length} comments`
                  : `${comments.length} comment`}
              </Typography>
            </StyledInteractButton>
          </Stack>

          <ActionButtons
            post={post}
            userReaction={userReaction}
            setUserReaction={setUserReaction}
          />
        </StyledContentWrapper>
        <StyledContentWrapper>
          {isMoreComments && (
            <StyledInteractButton
              sx={{ mb: theme.spacing(1) }}
              onClick={() => handleShowMoreComments()}
            >
              <Typography variant='subtitle2' color={theme.palette.text.secondary} fontWeight='400'>
                View more comments
              </Typography>
            </StyledInteractButton>
          )}
          <Comments comments={post?.comments} onlyUniqueUsers maxComments={maxComments} />
        </StyledContentWrapper>
      </StyledRoot>
      {isFullViewOpen && <FullPagePostView post={post} setOpen={setIsFullViewOpen} />}
    </>
  );
}
