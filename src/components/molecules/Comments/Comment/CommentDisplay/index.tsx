import { IconButton, Stack, Typography, useTheme } from '@mui/material';

import { deleteUserComment } from '@/common/firebase/comments/deleteUserComment';
import isObjectEmpty from '@/common/misc/objectManagment/isObjectEmpty';
import Icon from '@/components/atoms/Icon/Icon';
import UserLink from '@/components/atoms/UserLink';
import ReactionsDisplayBox from '@/components/molecules/ReactionsDisplay';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useRef, useState } from 'react';
import CommentManageMenu from '../CommentManageMenu';
import { StyledTextContent } from './styles';
import { CommentDisplayProps } from './types';

export default function CommentDisplay({
  element,
  elementType,
  refetchElement,
  comment,
  commentOwner,
  handleOpenEditMode,
  sx,
  ...rootProps
}: CommentDisplayProps) {
  const theme = useTheme();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const commentManageAnchor = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //determines if reactions should be displayed on right side of comment(when comment text is short)
  const reactionsOnRightSite = comment.commentText.length < 25;
  const isOwner = loggedUser?.id === comment.ownerId;

  async function handleCommentDelete() {
    setIsMenuOpen(false);
    await deleteUserComment({
      elementType: elementType,
      elementId: element.id,
      elementOwnerId: element.ownerId,
      commentId: comment.id,
    });
    refetchElement();
  }
  return (
    <Stack direction='row' position='relative' sx={sx} {...rootProps}>
      <StyledTextContent>
        {!!commentOwner && (
          <>
            <UserLink userId={commentOwner.id} usePopper />
            <Typography variant='body1'>{comment.commentText}</Typography>
          </>
        )}
      </StyledTextContent>
      <Stack
        direction='row'
        sx={{
          zIndex: 1,
          position: 'absolute',
          alignItems: 'center',
          height: '100%',
          right: reactionsOnRightSite || !isOwner ? theme.spacing(0.5) : theme.spacing(-3),
          transform: reactionsOnRightSite ? 'translateX(100%)' : 'none',
        }}>
        {comment.reactions && !isObjectEmpty(comment?.reactions) && (
          <ReactionsDisplayBox
            reactions={comment.reactions}
            emotesCount={2}
            displayNames={false}
            displayCount={true}
            sx={{
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[7],
              borderRadius: '10px',
              height: 'min-content',
              alignSelf: reactionsOnRightSite ? 'center' : 'flex-end',
              transform: reactionsOnRightSite ? 'none' : 'translateY(70%)',
            }}
          />
        )}

        {isOwner && (
          <>
            <IconButton
              ref={commentManageAnchor}
              onClick={() => setIsMenuOpen(true)}
              size='small'
              sx={{
                width: '28px',
                height: '28px',
                transform: 'translateX(25%)',
              }}>
              <Icon icon='ellipsis' fontSize={16} color={theme.palette.text.secondary} />
            </IconButton>
            <CommentManageMenu
              anchorEl={commentManageAnchor.current}
              open={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              handleOpenEditMode={() => {
                handleOpenEditMode();
                setIsMenuOpen(false);
              }}
              handleCommentDelete={handleCommentDelete}
            />
          </>
        )}
      </Stack>
    </Stack>
  );
}
