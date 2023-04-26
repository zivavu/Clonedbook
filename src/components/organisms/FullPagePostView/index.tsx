import { Box, GlobalStyles, Modal, Stack, Typography, useTheme } from '@mui/material';

import { StyledPostContentWrapper, StyledRoot } from './styles';

import ActionButtons from '@/components/molecules/ActionButtons';
import Comments from '@/components/molecules/Comments';
import { StyledDevider } from '@/components/molecules/FeedPost/PicturesDisplay/styles';
import PostOwnerInfoDisplay from '@/components/molecules/PostOwnerInfoDisplay';
import ReactionsDisplay from '@/components/molecules/ReactionsDisplay';
import { FullPagePostViewProps } from './types';

export default function FullPagePostView({
  post,
  setOpen,
  sx,
  ...rootProps
}: FullPagePostViewProps) {
  const theme = useTheme();
  return (
    <>
      <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />
      <Modal open onClose={() => setOpen(false)}>
        <StyledRoot sx={sx} {...rootProps}>
          <Stack p={theme.spacing(1.5, 0)} position='relative'>
            <Typography textAlign='center' variant='h6' fontWeight='600'>
              {post.owner.firstName}&apos;s Post
            </Typography>
            <StyledDevider sx={{ bottom: 0 }} />
          </Stack>
          <StyledPostContentWrapper spacing={1}>
            <PostOwnerInfoDisplay owner={post.owner} createdAt={post.createdAt} />
            <Typography variant='body2'>{post.postText}</Typography>
            <Stack direction='row' alignItems='center'>
              <ReactionsDisplay exampleReactors={post.exampleReactors} reactions={post.reactions} />
              <Typography ml='auto' color={theme.palette.text.secondary} variant='caption'>
                {post.comments.length > 1 ? `${post.comments.length} comments` : `1comment`}
              </Typography>
            </Stack>
            <ActionButtons sx={{ borderBottom: 'none' }} />
            <Comments comments={post.comments} maxComments='all' />
          </StyledPostContentWrapper>
        </StyledRoot>
      </Modal>
    </>
  );
}
