import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import getEntriesLength from '@/common/misc/objectManagment/getEntriesLength';
import isObjectEmpty from '@/common/misc/objectManagment/isObjectEmpty';
import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import HorizontalContentDevider from '@/components/atoms/contentDeviders/HorizontalContentDevider';
import ActionButtons from '@/components/molecules/ActionButtons';
import Comments from '@/components/molecules/Comments';
import ElementOwnerInfoDisplay from '@/components/molecules/ElementOwnerInfoDisplay';
import ElementTextEditInput from '@/components/molecules/ElementTextEditInput';
import ReactionsDisplayBox from '@/components/organisms/ReactionsDisplay';
import { useRef, useState } from 'react';
import { NAVBAR_HEIGHT } from '../../NavBar';
import RightSection from '../../NavBar/RightSection';
import { ElementInfoProps } from './types';

export default function ElementInfo({
  element,
  type,
  refetchElement,
  sx,
  ...rootProps
}: ElementInfoProps) {
  const theme = useTheme();
  const commentsLength = getEntriesLength(element.comments);
  const owner = useGetUserBasicInfo(element.ownerId);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const [isInPhotoTextEditMode, setIsInPhotoTextEditMode] = useState(false);

  function handleCommentInputFocus() {
    if (!commentInputRef.current) return;
    commentInputRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
    commentInputRef.current.focus();
  }

  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Stack
        direction='row'
        width='100%'
        height={NAVBAR_HEIGHT}
        justifyContent='flex-end'
        sx={{
          [theme.breakpoints.down('lg')]: {
            display: 'none',
          },
        }}>
        <RightSection mr={theme.spacing(0.5)} />
      </Stack>

      <HorizontalContentDevider />

      <ElementOwnerInfoDisplay
        owner={owner}
        element={element}
        elementType={type}
        refetchElement={refetchElement}
        handleOpenEditMode={() => setIsInPhotoTextEditMode((prev) => !prev)}
        mt={theme.spacing(2)}
        mb={theme.spacing(1)}
      />

      {isInPhotoTextEditMode ? (
        <ElementTextEditInput
          element={element}
          elementType={type}
          refetchElement={refetchElement}
          handleCloseEditMode={() => setIsInPhotoTextEditMode((prev) => !prev)}
        />
      ) : (
        <Box mb={theme.spacing(4)}>
          <Typography variant='body1'>{element.text}</Typography>
        </Box>
      )}

      <Stack width='100%' direction='row' justifyContent='space-between'>
        {!isObjectEmpty(element.reactions) && (
          <ReactionsDisplayBox reactions={element.reactions} displayCount displayNames={false} />
        )}

        <Box display='flex'>
          <Typography pr={theme.spacing(1)} variant='subtitle2' sx={{ color: 'text.secondary' }}>
            {commentsLength === 0
              ? ''
              : commentsLength > 1
              ? `${commentsLength} comments`
              : `${commentsLength} comment`}
          </Typography>
          {element.shareCount > 0 && (
            <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
              {element.shareCount} {element.shareCount > 1 ? 'shares' : 'share'}
            </Typography>
          )}
        </Box>
      </Stack>

      <ActionButtons
        element={element}
        elementType={type}
        refetchElement={refetchElement}
        handleCommentClick={handleCommentInputFocus}
        my={theme.spacing(1)}
      />

      <Comments
        element={element}
        elementType={type}
        maxComments='all'
        displayMode='picture'
        commentInputRef={commentInputRef}
        refetchElement={refetchElement}
      />
    </StyledRoot>
  );
}
