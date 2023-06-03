import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import { StyledContentWrapper, StyledRoot } from './styles';

import getEntriesLength from '@/common/misc/objectManagment/getEntriesLength';
import useGetUsersPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import InteractButton from '@/components/atoms/InteractButton';
import ActionButtons from '@/components/molecules/ActionButtons';
import Comments from '@/components/molecules/Comments';
import PostOwnerInfoDisplay from '@/components/molecules/PostOwnerInfoDisplay';
import ReactionsDisplay from '@/components/molecules/ReactionsDisplay';
import FullPagePostView from '@/components/organisms/FullPagePostView';
import { useFetchLoggedUserQuery } from '@/redux/services/userAPI';
import { TLocalUserReaction } from '@/types/reaction';
import { useState } from 'react';
import PicturesDisplay from './PicturesDisplay';
import { FeedPostProps } from './types';

export default function FeedPost({ post, sx, ...rootProps }: FeedPostProps) {
  const { data: user } = useFetchLoggedUserQuery({});
  const { id: postId, comments, pictures: postPictures, text: postText, reactions } = post;
  const owner = useGetUsersPublicData(post.ownerId);
  const theme = useTheme();
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);

  const [userReaction, setUserReaction] = useState<TLocalUserReaction>(
    reactions[user?.id || ''] || undefined,
  );

  const displayReactorNames = useMediaQuery(theme.breakpoints.up('sm'));

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
      {isFullViewOpen && <FullPagePostView postId={post.id} setOpen={setIsFullViewOpen} />}
      <StyledRoot sx={sx} {...rootProps}>
        <StyledContentWrapper sx={{ pt: theme.spacing(2) }}>
          <PostOwnerInfoDisplay owner={owner} createdAt={post.createdAt} />
          {hasText && (
            <Box sx={{ pt: theme.spacing(1) }}>
              {isTextLong ? (
                <Typography variant='body1'>{postText}</Typography>
              ) : (
                <Typography variant='h4' fontWeight='400' lineHeight='1.7rem'>
                  {postText}
                </Typography>
              )}
            </Box>
          )}
        </StyledContentWrapper>
        {hasPictures && (
          <Box mt={theme.spacing(1)}>
            <PicturesDisplay pictures={postPictures as string[]} postId={postId} />
          </Box>
        )}

        <StyledContentWrapper>
          <Stack direction='row' alignItems='center' mb={theme.spacing(1)}>
            <ReactionsDisplay
              reactions={reactions}
              userReaction={userReaction}
              displayNames={displayReactorNames}
              displayCount={!displayReactorNames}
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

          <ActionButtons
            elementId={post.id}
            elementType='post'
            ownerId={post.ownerId}
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
          <Comments
            comments={comments}
            onlyUniqueUsers
            elementType='post'
            maxComments={maxComments}
            post={post}
            displayMode='feed'
          />
        </StyledContentWrapper>
      </StyledRoot>
    </>
  );
}
