import { Typography } from '@mui/material';

import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { StyledPostContentWrapper, StyledRoot } from '../../styles';
import { StyledIcon, StyledIconContainer } from '../styles';
import { NoPostsTileProps } from './types';

export default function NoPostsTile({ wallOwnerId, sx, ...rootProps }: NoPostsTileProps) {
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const isOwner = loggedUser?.id === wallOwnerId;
  return (
    <StyledRoot height={220} position='relative' sx={sx} {...rootProps}>
      <StyledPostContentWrapper
        sx={{
          width: '90%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
        spacing={2}>
        <StyledIconContainer>
          <StyledIcon icon='sad-tear' />
        </StyledIconContainer>
        <Typography variant='h3' fontWeight={600}>
          {isOwner ? 'You have no posts added' : 'This user has no posts'}
        </Typography>
      </StyledPostContentWrapper>
    </StyledRoot>
  );
}
