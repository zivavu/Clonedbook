import { Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import getChatNewestMessage from '@/common/chatsManage/getChatLastMessage';
import useHandleOpenChat from '@/common/chatsManage/useHandleOpenChat';
import getDateDiffs from '@/common/misc/dateManagment/getDateDiffs';
import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import UserAvatar from '@/components/atoms/UserAvatar';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { ListUserProps } from './types';

export default function ListUserButton({
  chat,
  handlePopperClose,
  sx,
  ...rootProps
}: ListUserProps) {
  const theme = useTheme();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const friendId = chat.users.find((user) => user !== loggedUser?.id) as string;
  const friendData = useGetUserBasicInfo(friendId);
  const lastMessage = getChatNewestMessage(chat);
  const handleChatOpen = useHandleOpenChat(friendId);

  const { largestDiff } = getDateDiffs(lastMessage.createdAt.seconds);
  return (
    <StyledRoot
      sx={sx}
      {...rootProps}
      onClick={() => {
        handleChatOpen();
        handlePopperClose();
      }}>
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
