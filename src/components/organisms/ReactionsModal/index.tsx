import {
  Box,
  GlobalStyles,
  Modal,
  Stack,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material';
import { StyledRoot, StyledToggleButton, StyledUsersContainer } from './styles';

import Link from '@/components/atoms/Link';
import ReactionIcon from '@/components/atoms/ReactionIcon';
import { SelectButtonUnderline } from '@/components/atoms/SelectedButtonUnderline/styles';
import UserAvatar from '@/components/atoms/UserAvatar';
import useDeserializeReactions from '@/hooks/useDeserializeReactions';
import { TReactionType } from '@/types/reaction';
import { useState } from 'react';
import { ReactionsModalProps } from './types';

export default function ReactionsPortal({
  reactions,
  setShowModal,
  sx,
  ...rootProps
}: ReactionsModalProps) {
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
      <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />
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
            <StyledUsersContainer spacing={1}>
              {reactionsToShow?.map((reaction) => {
                const { firstName, lastName, pictureUrl, id: profileId } = reaction.info;
                return (
                  <Stack key={profileId} direction='row' alignItems='center'>
                    <Box position='relative'>
                      <UserAvatar userId={profileId} mr={theme.spacing(1)} size={40} />
                      <ReactionIcon
                        src={reactionsByTypes[reaction.type].icon}
                        sx={{ position: 'absolute', bottom: '-4px', right: '10px' }}
                        showBorder={false}
                        size={16}
                      />
                    </Box>
                    <Link href={`profile/${profileId}`}>
                      {firstName} {lastName}
                    </Link>
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
