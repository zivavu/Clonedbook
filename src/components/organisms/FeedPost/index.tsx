import { Box, Typography, useTheme } from '@mui/material';

import { StyledPostContentWrapper, StyledRoot } from './styles';

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
  const { comments, pictures: postPictures } = post;
  const owner = useGetUserBasicInfo(post.ownerId);
  const theme = useTheme();
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);
  const [isInPostTextEditMode, setIsInPostTextEditMode] = useState(false);

  const hasPictures = postPictures && postPictures.length > 0;

  const getMaxComments = () => {
    const commentsSlice = Object.values(comments).slice(0, 2);
    const exampleCommentsLength =
      (commentsSlice[0]?.commentText?.length || 0) + (commentsSlice[1]?.commentText?.length || 0);
    return exampleCommentsLength > 200 ? 1 : 2;
  };

  const maxComments = getMaxComments();
  const isMoreComments = Object.values(comments).length > maxComments;

  const handleShowMoreComments = () => {
    setIsFullViewOpen(true);
  };

  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToCommentInput = () => {
    if (commentInputRef.current) {
      commentInputRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
      commentInputRef.current.focus();
    }
  };

  const handleCommentInputFocus = () => {
    scrollToCommentInput();
  };

  return (
    <>
      {isFullViewOpen && (
        <FullPagePostView post={post} setOpen={setIsFullViewOpen} refetchPost={refetchPost} />
      )}

      <StyledRoot data-testid='feed-post' sx={sx} {...rootProps}>
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
          <Box data-testid='post-image' mt={theme.spacing(1)}>
            <PicturesDisplay
              pictures={postPictures as IPictureWithPlaceholders[]}
              key={post.id}
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
            <InteractButton
              data-testid='view-more-comments'
              sx={{ mb: theme.spacing(1) }}
              onClick={() => handleShowMoreComments()}>
              <Typography variant='subtitle2' color={theme.palette.text.secondary} fontWeight='500'>
                View more comments
              </Typography>
            </InteractButton>
          )}
          <Comments
            data-testid='comments'
            onlyUniqueUsers
            parentElementType='post'
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
