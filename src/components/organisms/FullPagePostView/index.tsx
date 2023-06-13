import { Modal, Stack, Typography, useTheme } from '@mui/material';

import { StyledCloseIconButton, StyledPostContentWrapper, StyledRoot } from './styles';

import useFetchSinglePostData from '@/common/firebase/posts/useFetchSinglePostData';
import getEntriesLength from '@/common/misc/objectManagment/getEntriesLength';
import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import Icon from '@/components/atoms/Icon/Icon';
import HorizontalContentDevider from '@/components/atoms/contentDeviders/HorizontalContentDevider';
import ActionButtons from '@/components/molecules/ActionButtons';
import Comments from '@/components/molecules/Comments';
import ElementTextEditInput from '@/components/molecules/ElementTextEditInput';
import PostOwnerInfoDisplay from '@/components/molecules/PostOwnerInfoDisplay';
import ReactionsDisplayBox from '@/components/molecules/ReactionsDisplay';
import { useRef, useState } from 'react';
import { FullPagePostViewProps } from './types';

export default function FullPagePostView({
  postId,
  setOpen,
  refetchPost: refetchPostInFeed,
  sx,
  ...rootProps
}: FullPagePostViewProps) {
  const theme = useTheme();
  const { postData: post, refetchPost: refetchSinglePost } = useFetchSinglePostData(postId);
  async function refetchPost() {
    await Promise.allSettled([refetchPostInFeed(), refetchSinglePost()]);
  }

  const owner = useGetUserBasicInfo(post?.ownerId || '');

  const [isInPostTextEditMode, setIsInPostTextEditMode] = useState(false);

  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  function handleCommentInputFocus() {
    if (!commentInputRef.current) return;
    commentInputRef.current.focus();
  }

  if (!post) return null;
  return (
    <Modal
      open
      onClose={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false);
      }}>
      <StyledRoot sx={sx} {...rootProps}>
        <Stack p={theme.spacing(1.5, 0)} position='relative'>
          <StyledCloseIconButton onClick={() => setOpen(false)}>
            <Icon icon='xmark' />
          </StyledCloseIconButton>
          <Typography textAlign='center' variant='h4' fontWeight='600'>
            {owner?.firstName || ''}&apos;s Post
          </Typography>
          <HorizontalContentDevider sx={{ bottom: 0 }} />
        </Stack>
        <StyledPostContentWrapper spacing={1}>
          <PostOwnerInfoDisplay
            owner={owner}
            element={post}
            elementType='post'
            refetchElement={refetchPost}
            handleOpenEditMode={() => setIsInPostTextEditMode((prev) => !prev)}
          />
          {isInPostTextEditMode ? (
            <ElementTextEditInput
              element={post}
              elementType='post'
              handleCloseEditMode={() => setIsInPostTextEditMode(false)}
              refetchElement={refetchPost}
            />
          ) : (
            <Typography variant='body1'>{post.text}</Typography>
          )}
          <Stack direction='row' alignItems='center'>
            <ReactionsDisplayBox reactions={post.reactions} />
            <Typography ml='auto' color={theme.palette.text.secondary} variant='body1'>
              {getEntriesLength(post.comments) > 1
                ? `${getEntriesLength(post.comments)} comments`
                : `1 comment`}
            </Typography>
          </Stack>
          <ActionButtons
            element={post}
            elementType='post'
            refetchElement={refetchPostInFeed}
            handleCommentClick={handleCommentInputFocus}
            sx={{ borderBottom: 'none' }}
          />
          <Comments
            elementType='post'
            refetchElement={refetchPostInFeed}
            commentInputRef={commentInputRef}
            element={post}
            sx={{ height: '100%' }}
            maxComments='all'
          />
        </StyledPostContentWrapper>
      </StyledRoot>
    </Modal>
  );
}
