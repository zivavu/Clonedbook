import { Box, ListItemButton, Typography, useTheme } from '@mui/material';

import useHandleOpenChat from '@/common/chatsManage/useHandleOpenChat';
import UserAvatar from '@/components/atoms/UserAvatar';
import UserPreviewPopper from '../../UserPreviewPopper';
import UserPreviewPopperHandlers from '../../UserPreviewPopper/UserPreviewPopperHandlers';
import { FriendListItemProps } from './types';

export default function FriendListItem({ friend, sx, ...rootProps }: FriendListItemProps) {
  const theme = useTheme();
  const handleChatOpen = useHandleOpenChat(friend.id);

  const {
    anchorElRef,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchEnd,
    handleTouchStart,
    isPopperOpen,
  } = UserPreviewPopperHandlers();

  return (
    <>
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        ref={anchorElRef}
        sx={sx}
        {...rootProps}>
        <ListItemButton onClick={handleChatOpen} sx={{ pl: theme.spacing(1) }}>
          <UserAvatar
            userId={friend.id}
            useLink={false}
            sx={{ mr: theme.spacing(1.5), width: 36, height: 36 }}
          />
          <Typography variant='body1'>
            {friend.basicInfo.firstName} {friend.basicInfo.lastName}
          </Typography>
        </ListItemButton>
      </Box>
      <UserPreviewPopper
        open={isPopperOpen}
        userId={friend.id}
        anchorEl={anchorElRef.current}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </>
  );
}
