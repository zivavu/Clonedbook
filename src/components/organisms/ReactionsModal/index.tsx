import {
  Box,
  GlobalStyles,
  Modal,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material';
import { StyledRoot, StyledToggleButton, StyledUsersContainer } from './styles';

import ReactionIcon from '@/components/atoms/ReactionIcon';
import { SelectButtonUnderline } from '@/components/atoms/SelectedButtonUnderline/styles';
import UserAvatar from '@/components/atoms/UserAvatar';
import { TReactionType } from '@/types/reaction';
import deserializeReactions from '@/utils/deserializeReactions';
import useGetReactorsData from '@/utils/useGetReactorsData';
import { userInfo } from 'os';
import { useState } from 'react';
import { ReactionsModalProps } from './types';

export default function ReactionsPortal({
  reactionsArr,
  setShowModal,
  sx,
  ...rootProps
}: ReactionsModalProps) {
  const theme = useTheme();
  const { usersReactions, isLoading, error } = useGetReactorsData(reactionsArr);
  const { reactionsByTypes, reactionsCount, largestByType } = deserializeReactions(reactionsArr);

  const [showedType, setShowedType] = useState<TReactionType | 'all'>('all');
  const reactionsToShow =
    showedType === 'all'
      ? usersReactions
      : usersReactions?.filter((reaction) => reaction.type === showedType);
  return (
    <>
      <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />
      <Modal open keepMounted onClose={() => setShowModal(false)}>
        <StyledRoot sx={sx} {...rootProps}>
          <Box>
            <ToggleButtonGroup
              exclusive
              value={showedType}
              onChange={(e, value) => {
                setShowedType(value);
              }}
            >
              <StyledToggleButton value='all'>
                <Typography variant='body1' textTransform='none' fontWeight='400'>
                  All
                </Typography>
                {showedType === 'all' && <SelectButtonUnderline />}
              </StyledToggleButton>
              {largestByType.map((reaction) => {
                if (reaction.count === 0) return null;
                const selected = showedType === reaction.type;
                return (
                  <StyledToggleButton key={reaction.type} value={reaction.type}>
                    <Stack direction='row' alignItems='center'>
                      <ReactionIcon src={reaction.icon} size={18} showBorder={false} />
                      <Typography variant='body2' fontWeight='400' ml={theme.spacing(1.3)}>
                        {reaction.count}
                      </Typography>
                    </Stack>
                    {selected && <SelectButtonUnderline />}
                  </StyledToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Box>
          {!isLoading && !error && (
            <StyledUsersContainer spacing={1}>
              {reactionsToShow?.map((reaction) => {
                const { firstName, lastName, profilePicture, profileId } = reaction.userInfo;
                return (
                  <Stack key={profileId} direction='row' alignItems='center'>
                    <Box position='relative'>
                      <UserAvatar src={profilePicture} mr={theme.spacing(1)} size={40} />
                      <ReactionIcon
                        src={reactionsByTypes[reaction.type].icon}
                        sx={{ position: 'absolute', bottom: '-4px', right: '10px' }}
                        showBorder={false}
                        size={18}
                      />
                    </Box>
                    <Typography variant='body2' fontWeight='400'>
                      {firstName} {lastName}
                    </Typography>
                  </Stack>
                );
              })}
            </StyledUsersContainer>
          )}
        </StyledRoot>
      </Modal>
    </>
  );
}
