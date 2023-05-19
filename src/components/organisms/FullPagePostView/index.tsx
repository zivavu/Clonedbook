import { GlobalStyles, Modal, Stack, Typography, useTheme } from '@mui/material';

import { StyledPostContentWrapper, StyledRoot } from './styles';

import ContentDevider from '@/components/atoms/ContentDevider';
import ActionButtons from '@/components/molecules/ActionButtons';
import Comments from '@/components/molecules/Comments';
import PostOwnerInfoDisplay from '@/components/molecules/PostOwnerInfoDisplay';
import ReactionsDisplay from '@/components/molecules/ReactionsDisplay';
import { useFetchLoggedUserQuery } from '@/features/userAPI';
import useFetchPostData from '@/hooks/useFetchPostData';
import useGetUsersPublicData from '@/hooks/useGetUsersPublicData';
import { TLocalUserReaction } from '@/types/reaction';
import getEntriesLength from '@/utils/objectManagment/getEntriesLength';
import { useEffect, useState } from 'react';
import { FullPagePostViewProps } from './types';

export default function FullPagePostView({
  postId,
  setOpen,
  sx,
  ...rootProps
}: FullPagePostViewProps) {
  const theme = useTheme();
  const { postData: post, isError, isLoading } = useFetchPostData(postId);
  const { data: user } = useFetchLoggedUserQuery({});
  const owner = useGetUsersPublicData(post?.ownerId || '');
  const [userReaction, setUserReaction] = useState<TLocalUserReaction>(
    post?.reactions[user?.id || ''] || undefined,
  );

  useEffect(() => {
    setUserReaction(post?.reactions[user?.id || ''] || undefined);
  }, [post, user?.id]);

  return isLoading || isError || !post ? null : (
    <>
      <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />
      <Modal open onClose={() => setOpen(false)}>
        <StyledRoot sx={sx} {...rootProps}>
          <Stack p={theme.spacing(1.5, 0)} position='relative'>
            <Typography textAlign='center' variant='h6' fontWeight='600'>
              {owner?.firstName || ''}&apos;s Post
            </Typography>
            <ContentDevider sx={{ bottom: 0 }} />
          </Stack>
          <StyledPostContentWrapper spacing={1}>
            <PostOwnerInfoDisplay owner={owner} createdAt={post.createdAt} />
            <Typography variant='body1'>{post.text}</Typography>
            <Stack direction='row' alignItems='center'>
              <ReactionsDisplay userReaction={userReaction} reactions={post.reactions} />
              <Typography ml='auto' color={theme.palette.text.secondary} variant='caption'>
                {getEntriesLength(post.comments) > 1
                  ? `${getEntriesLength(post.comments)} comments`
                  : `1comment`}
              </Typography>
            </Stack>
            <ActionButtons
              elementType='post'
              elementId={post.id}
              ownerId={post.ownerId}
              userReaction={userReaction}
              setUserReaction={setUserReaction}
              sx={{ borderBottom: 'none' }}
            />
            <Comments
              comments={post.comments}
              post={post}
              sx={{ height: '100%' }}
              maxComments='all'
            />
          </StyledPostContentWrapper>
        </StyledRoot>
      </Modal>
    </>
  );
}
