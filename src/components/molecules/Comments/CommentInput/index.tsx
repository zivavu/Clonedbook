import { SxProps, Theme, useTheme } from '@mui/material';

import { StyledCommentInput, StyledRoot, StyledWrapper } from './styles';

import { createUserComment } from '@/common/firebase/createData/createUserComment';
import UserAvatar from '@/components/atoms/UserAvatar';
import { useLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useForm } from 'react-hook-form';
import { CommentInputProps } from './types';

export default function CommentInput({
  sx,
  element,
  refetchElement,
  parentElementType,
  displayMode,
  ...rootProps
}: CommentInputProps) {
  const { data: loggedUser } = useLoggedUserQuery({});
  const theme = useTheme();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    if (!loggedUser) return;
    await createUserComment({
      commentText: data.commentText,
      elementId: element.id,
      elementOwnerId: element.ownerId,
      elementType: parentElementType,
      loggedUserId: loggedUser.id,
    });
    reset();
    if (refetchElement) refetchElement();
  });

  let modeSx: SxProps<Theme>;
  switch (displayMode) {
    case 'post':
      modeSx = { p: theme.spacing(2, 0), position: 'sticky', bottom: 0 };
      break;
    case 'picture':
      modeSx = { p: theme.spacing(1, 0), position: 'sticky', bottom: 0 };
      break;
    case 'feed':
      modeSx = { pb: theme.spacing(1) };
      break;
    default:
      modeSx = { pb: theme.spacing(1) };
  }

  return (
    <StyledRoot sx={{ ...modeSx, ...sx }} {...rootProps}>
      <form onSubmit={onSubmit}>
        <StyledWrapper>
          <UserAvatar size={30} sx={{ mr: theme.spacing(0.7) }} userId={loggedUser?.id} />
          <StyledCommentInput
            multiline
            fullWidth
            size='small'
            {...register('commentText', { required: true, maxLength: 4000 })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
            placeholder='Write a comment...'
          />
        </StyledWrapper>
      </form>
    </StyledRoot>
  );
}
