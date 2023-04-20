import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledInteractButton, StyledRoot, StyledTextContent } from './styles';

import UserAvatar from '@/components/atoms/UserAvatar';
import ReactionsDisplay from '../../ReactionsDisplay';
import { CommentProps } from './types';

export default function Comment({ comment, ...rootProps }: CommentProps) {
  const theme = useTheme();
  return (
    <StyledRoot {...rootProps}>
      <Box display='flex' alignItems='center'>
        <UserAvatar src={comment.owner.profilePicture} sx={{ alignSelf: 'start' }} size={32} />
        <StyledTextContent>
          <Typography variant='body2' fontWeight='400' lineHeight='1.2rem'>
            {comment.owner.firstName} {comment.owner.lastName}
          </Typography>
          <Typography variant='body2' lineHeight='1.2rem'>
            {comment.commentText}
          </Typography>
          {!!comment.reactions && (
            <ReactionsDisplay
              reactions={comment.reactions}
              emotesCount={2}
              displayNames={false}
              displayCount={true}
              sx={{
                backgroundColor: theme.palette.secondary.light,
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 3px 0px',
                borderRadius: '10px',
                zIndex: 1,
                position: 'absolute',
                bottom: '-15px',
                right: theme.spacing(1),
              }}
            />
          )}
        </StyledTextContent>
      </Box>
      <Stack ml={theme.spacing(6)} direction='row' alignItems='center'>
        <StyledInteractButton disableRipple sx={{ mr: theme.spacing(1) }}>
          Like
        </StyledInteractButton>
        <StyledInteractButton disableRipple>Reply</StyledInteractButton>
      </Stack>
    </StyledRoot>
  );
}
