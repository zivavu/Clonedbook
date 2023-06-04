import { Box, Modal, Stack, ToggleButtonGroup, Typography, useTheme } from '@mui/material';
import { StyledRoot, StyledToggleButton, StyledUsersContainer } from './styles';

import useDeserializeReactions from '@/common/misc/userDataManagment/useDeserializeReactions';
import ReactionIcon from '@/components/atoms/ReactionIcon';
import { SelectButtonUnderline } from '@/components/atoms/SelectedButtonUnderline/styles';
import { TReactionType } from '@/types/reaction';
import { useState } from 'react';
import SingleUser from './SingleUser';
import { AllReactionsModalProps } from './types';

export default function AllReactionsModal({
  reactions,
  setShowModal,
  sx,
  ...rootProps
}: AllReactionsModalProps) {
  const theme = useTheme();
  const { isLoading, reactingUsers, reactionsByTypes, largestByType } =
    useDeserializeReactions(reactions);

  const [showedType, setShowedType] = useState<TReactionType | 'all'>('all');
  const reactionsToShow =
    showedType === 'all'
      ? reactingUsers
      : reactingUsers?.filter((reaction) => reaction.type === showedType);
  return (
    <>
      <Modal open onClose={() => setShowModal(false)}>
        <StyledRoot sx={sx} {...rootProps}>
          <Box>
            <ToggleButtonGroup
              exclusive
              value={showedType}
              onChange={(e, value) => {
                setShowedType(value);
              }}>
              <StyledToggleButton value='all'>
                <Typography variant='subtitle1' textTransform='none' fontWeight='400'>
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
                      <ReactionIcon src={reaction.icon} size={20} showBorder={false} />
                      <Typography variant='body1' fontWeight='400' ml={theme.spacing(1.3)}>
                        {reaction.count}
                      </Typography>
                    </Stack>
                    {selected && <SelectButtonUnderline />}
                  </StyledToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Box>
          {!isLoading && (
            <StyledUsersContainer spacing={2}>
              {reactionsToShow?.map((reaction) => (
                <SingleUser
                  key={reaction.userId}
                  reaction={reaction}
                  reactionsByTypes={reactionsByTypes}
                />
              ))}
            </StyledUsersContainer>
          )}
        </StyledRoot>
      </Modal>
    </>
  );
}
