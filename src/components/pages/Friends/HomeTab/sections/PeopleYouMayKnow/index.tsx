import { Box, BoxProps, Typography } from '@mui/material';

import useGetFriendSueggestions from '@/hooks/useGetFriendSueggestions';
import { StyledFriendTilesWrapper } from '../../../styles';
import FriendTile from '../../FriendTile';

export default function PeopleYouMayKnow({ sx, ...rootProps }: BoxProps) {
  const peopleYouMayKnow = useGetFriendSueggestions();
  return (
    <Box sx={sx} {...rootProps}>
      <Typography textTransform='capitalize' variant='h4' fontWeight={650}>
        people you may know
      </Typography>
      <StyledFriendTilesWrapper>
        {peopleYouMayKnow?.slice(0, 15).map((userId) => (
          <FriendTile key={userId} userId={userId} />
        ))}
      </StyledFriendTilesWrapper>
    </Box>
  );
}
