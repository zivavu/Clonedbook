import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import ContentDevider from '@/components/atoms/ContentDevider';
import ActionButtons from '@/components/molecules/ActionButtons';
import Comments from '@/components/molecules/Comments';
import PostOwnerInfoDisplay from '@/components/molecules/PostOwnerInfoDisplay';
import ReactionsDisplay from '@/components/molecules/ReactionsDisplay';
import useGetUsersPublicData from '@/hooks/useGetUsersPublicData';
import getEntriesLength from '@/utils/objectManagment/getEntriesLength';
import isObjectEmpty from '@/utils/objectManagment/isObjectEmpty';
import RightSection from '../../NavBar/RightSection';
import { ElementInfoProps } from './types';

export default function ElementInfo({
  element,
  type,
  userReaction,
  setUserReaction,
  ...rootProps
}: ElementInfoProps) {
  const theme = useTheme();
  const commentsLength = getEntriesLength(element.comments);
  const owner = useGetUsersPublicData(element.ownerId);
  return (
    <StyledRoot {...rootProps}>
      <Stack direction='row' width='100%' height='56px' justifyContent='flex-end'>
        <RightSection mr={theme.spacing(0.5)} />
      </Stack>
      <ContentDevider />
      <PostOwnerInfoDisplay
        owner={owner}
        createdAt={element.createdAt}
        mt={theme.spacing(2)}
        mb={theme.spacing(1)}
      />
      <Box mb={theme.spacing(4)}>
        <Typography variant='body1'>{element.text}</Typography>
      </Box>
      <Stack width='100%' direction='row' justifyContent='space-between'>
        {!isObjectEmpty(element.reactions) && (
          <ReactionsDisplay
            userReaction={userReaction}
            reactions={element.reactions}
            displayCount
            displayNames={false}
          />
        )}
        <Box display='flex'>
          <Typography pr={theme.spacing(1)} variant='subtitle2' sx={{ color: 'text.secondary' }}>
            {commentsLength === 0
              ? ''
              : commentsLength > 1
              ? `${commentsLength} comments`
              : `${commentsLength} comment`}
          </Typography>
          <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
            {element.shareCount} shares
          </Typography>
        </Box>
      </Stack>
      <ActionButtons
        userReaction={userReaction}
        setUserReaction={setUserReaction}
        ownerId={element.ownerId}
        elementId={element.id}
        type={type}
        mt={theme.spacing(1)}
        mb={theme.spacing(4)}
      />
      <Comments post={element} comments={element.comments} maxComments='all' />
    </StyledRoot>
  );
}
