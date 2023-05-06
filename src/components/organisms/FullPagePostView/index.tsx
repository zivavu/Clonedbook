import { GlobalStyles, Modal, Stack, Typography, useTheme } from '@mui/material';

import { StyledPostContentWrapper, StyledRoot } from './styles';

import ContentDevider from '@/components/atoms/ContentDevider';
import ActionButtons from '@/components/molecules/ActionButtons';
import Comments from '@/components/molecules/Comments';
import PostOwnerInfoDisplay from '@/components/molecules/PostOwnerInfoDisplay';
import ReactionsDisplay from '@/components/molecules/ReactionsDisplay';
import { useFetchUserQuery } from '@/features/userAPI';
import useGetPostData from '@/hooks/UseGetPostData';
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
  const { postData: post, isError, isLoading } = useGetPostData(postId);
  const { data: user } = useFetchUserQuery({});
  const [userReaction, setUserReaction] = useState<TLocalUserReaction>(
    post?.reactions[user?.profileId || ''] || undefined,
  );
  useEffect(() => {
    setUserReaction(post?.reactions[user?.profileId || ''] || undefined);
  }, [post, user?.profileId]);

  return isLoading || isError || !post ? null : (
    <>
      <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />
      <Modal open onClose={() => setOpen(false)}>
        <StyledRoot sx={sx} {...rootProps}>
          <Stack p={theme.spacing(1.5, 0)} position='relative'>
            <Typography textAlign='center' variant='h6' fontWeight='600'>
              {post.owner.firstName}&apos;s Post
            </Typography>
            <ContentDevider sx={{ bottom: 0 }} />
          </Stack>
          <StyledPostContentWrapper spacing={1}>
            <PostOwnerInfoDisplay owner={post.owner} createdAt={post.createdAt} />
            <Typography variant='body1'>{post.postText}</Typography>
            <Stack direction='row' alignItems='center'>
              <ReactionsDisplay userReaction={userReaction} reactions={post.reactions} />
              <Typography ml='auto' color={theme.palette.text.secondary} variant='caption'>
                {getEntriesLength(post.comments) > 1
                  ? `${getEntriesLength(post.comments)} comments`
                  : `1comment`}
              </Typography>
            </Stack>
            <ActionButtons
              userReaction={userReaction}
              setUserReaction={setUserReaction}
              post={post}
              sx={{ borderBottom: 'none' }}
            />
            <Comments comments={post.comments} post={post} maxComments='all' />
          </StyledPostContentWrapper>
        </StyledRoot>
      </Modal>
    </>
  );
}
