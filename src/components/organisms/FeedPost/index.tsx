import { Box, Typography, useTheme } from '@mui/material';

import { StyledContentWrapper, StyledRoot } from './styles';

import getEntriesLength from '@/common/misc/objectManagment/getEntriesLength';
import useGetUserPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import InteractButton from '@/components/atoms/InteractButton';
import Comments from '@/components/molecules/Comments';
import PostOwnerInfoDisplay from '@/components/molecules/PostOwnerInfoDisplay';
import FullPagePostView from '@/components/organisms/FullPagePostView';
import { IPictureUrls } from '@/types/picture';
import { useState } from 'react';
import PicturesDisplay from './PicturesDisplay';
import PostActions from './PostActions';
import { FeedPostProps } from './types';

export default function FeedPost({ post, sx, refetchPost, ...rootProps }: FeedPostProps) {
  const { id: postId, comments, pictures: postPictures, text: postText } = post;
  const owner = useGetUserPublicData(post.ownerId);
  const theme = useTheme();
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);

  const hasPictures = !!postPictures && postPictures[0] ? true : false;
  const hasText = !!postText ? true : false;
  const isTextLong = (postText && postText.length > 130) || hasPictures ? true : false;

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
            <PicturesDisplay pictures={postPictures as IPictureUrls[]} postId={postId} />
          </Box>
        )}

        <PostActions
          post={post}
          refetchPost={refetchPost}
          handleShowMoreComments={handleShowMoreComments}
        />

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
            element={post}
            maxComments={maxComments}
            refetchElement={refetchPost}
            displayMode='feed'
          />
        </StyledContentWrapper>
      </StyledRoot>
    </>
  );
}
