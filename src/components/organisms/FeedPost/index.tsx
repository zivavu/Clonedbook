import { Box, Typography, useTheme } from '@mui/material';

import { StyledPostContentWrapper, StyledRoot } from './styles';

import getEntriesLength from '@/common/misc/objectManagment/getEntriesLength';
import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import InteractButton from '@/components/atoms/InteractButton';
import Comments from '@/components/molecules/Comments';
import ElementOwnerInfoDisplay from '@/components/molecules/ElementOwnerInfoDisplay';
import FullPagePostView from '@/components/organisms/FullPagePostView';
import { IPictureWithPlaceholders } from '@/types/picture';
import { useRef, useState } from 'react';
import PicturesDisplay from './PicturesDisplay';
import PostActions from './PostActions';
import PostTextArea from './PostText';
import { FeedPostProps } from './types';

export default function FeedPost({ post, refetchPost, sx, ...rootProps }: FeedPostProps) {
  const { id: postId, comments, pictures: postPictures } = post;
  const owner = useGetUserBasicInfo(post.ownerId);
  const theme = useTheme();
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);
  const [isInPostTextEditMode, setIsInPostTextEditMode] = useState(false);

  const hasPictures = !!postPictures && postPictures[0] ? true : false;

  const commentsSlice = Object.values(comments).slice(0, 2);
  const exampleCommentsLength =
    commentsSlice[0]?.commentText?.length + (commentsSlice[1]?.commentText?.length || 0);
  const maxComments = exampleCommentsLength > 200 ? 1 : 2;
  const isMoreComments = getEntriesLength(comments) > maxComments;

  function handleShowMoreComments() {
    setIsFullViewOpen(true);
  }

  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  function handleCommentInputFocus() {
    if (!commentInputRef.current) return;
    commentInputRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
    commentInputRef.current.focus();
  }

  return (
    <>
      {isFullViewOpen && (
        <FullPagePostView post={post} setOpen={setIsFullViewOpen} refetchPost={refetchPost} />
      )}

      <StyledRoot sx={sx} {...rootProps}>
        <StyledPostContentWrapper sx={{ pt: theme.spacing(2) }}>
          <ElementOwnerInfoDisplay
            owner={owner}
            element={post}
            elementType='post'
            refetchElement={refetchPost}
            handleOpenEditMode={() => setIsInPostTextEditMode((prev) => !prev)}
          />
          <PostTextArea
            post={post}
            isInEditMode={isInPostTextEditMode}
            handleCloseEditMode={() => setIsInPostTextEditMode(false)}
            refetchPost={refetchPost}
          />
        </StyledPostContentWrapper>

        {hasPictures && (
          <Box mt={theme.spacing(1)}>
            <PicturesDisplay
              pictures={postPictures as IPictureWithPlaceholders[]}
              post={post}
              refetchPost={refetchPost}
            />
          </Box>
        )}

        <PostActions
          post={post}
          refetchPost={refetchPost}
          handleShowMoreComments={handleShowMoreComments}
          handleCommentInputFocus={handleCommentInputFocus}
        />

        <StyledPostContentWrapper>
          {isMoreComments && (
            <InteractButton sx={{ mb: theme.spacing(1) }} onClick={() => handleShowMoreComments()}>
              <Typography variant='subtitle2' color={theme.palette.text.secondary} fontWeight='500'>
                View more comments
              </Typography>
            </InteractButton>
          )}
          <Comments
            onlyUniqueUsers
            elementType='post'
            element={post}
            maxComments={maxComments}
            refetchElement={refetchPost}
            displayMode='feed'
            commentInputRef={commentInputRef}
            useAutoScroll={false}
          />
        </StyledPostContentWrapper>
      </StyledRoot>
    </>
  );
}
