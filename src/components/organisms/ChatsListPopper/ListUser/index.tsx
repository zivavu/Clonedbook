import { Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import getDateDiffs from '@/common/misc/dateManagment/getDateDiffs';
import useGetUserPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import UserAvatar from '@/components/atoms/UserAvatar';
import { useLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { ListUserProps } from './types';

export default function ListUser({ chat, sx, ...rootProps }: ListUserProps) {
  const theme = useTheme();
  const { data: loggedUser } = useLoggedUserQuery({});
  const friendId = chat.users.find((user) => user !== loggedUser?.id);
  const friendData = useGetUserPublicData(friendId);
  const lastMessage = [...chat.messages].sort(
    (a, b) => b?.createdAt?.seconds - a?.createdAt?.seconds,
  )[0];

  const { largestDiff } = getDateDiffs(lastMessage.createdAt.seconds);
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Stack direction='row' spacing={1.5} width='100%'>
        <UserAvatar userId={friendId} size={52} />
        <Stack width='60%'>
          <Typography variant='subtitle2'>
            {friendData?.firstName} {friendData?.lastName}
          </Typography>
          <Stack direction='row'>
            <Typography
              variant='body2'
              color={theme.palette.text.secondary}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
              {lastMessage.senderId === loggedUser?.id ? 'You: ' : ''}
              {lastMessage.text}
            </Typography>
            <Typography display='inline-block' variant='body2' color={theme.palette.text.secondary}>
              {'·'}
              {largestDiff.value}
              {largestDiff.unit}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </StyledRoot>
  );
}
