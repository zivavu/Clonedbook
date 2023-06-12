import { Modal, Stack, Typography, useTheme } from '@mui/material';

import { StyledCloseIconButton, StyledPostContentWrapper, StyledRoot } from './styles';

import useFetchSinglePostData from '@/common/firebase/readData/useFetchPostData';
import getEntriesLength from '@/common/misc/objectManagment/getEntriesLength';
import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import Icon from '@/components/atoms/Icon/Icon';
import HorizontalContentDevider from '@/components/atoms/contentDeviders/HorizontalContentDevider';
import ActionButtons from '@/components/molecules/ActionButtons';
import Comments from '@/components/molecules/Comments';
import PostOwnerInfoDisplay from '@/components/molecules/PostOwnerInfoDisplay';
import ReactionsDisplayBox from '@/components/molecules/ReactionsDisplay';
import { useRef } from 'react';
import { FullPagePostViewProps } from './types';

export default function FullPagePostView({
  postId,
  setOpen,
  sx,
  ...rootProps
}: FullPagePostViewProps) {
  const theme = useTheme();
  const { postData: post, refetchPost } = useFetchSinglePostData(postId);
  const owner = useGetUserBasicInfo(post?.ownerId || '');

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

  if (!post) return null;
  return (
    <Modal open onClose={() => setOpen(false)}>
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
          <PostOwnerInfoDisplay owner={owner} createdAt={post.createdAt} />
          <Typography variant='body1'>{post.text}</Typography>
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
            refetchElement={refetchPost}
            handleCommentClick={handleCommentInputFocus}
            sx={{ borderBottom: 'none' }}
          />
          <Comments
            comments={post.comments}
            elementType='post'
            refetchElement={refetchPost}
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
