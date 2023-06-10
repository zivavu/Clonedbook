import { Box, InputAdornment, List, TextField, Typography, useTheme } from '@mui/material';

import Icon from '@/components/atoms/Icon/Icon';
import ScrollableStack from '@/components/atoms/scrollables/ScrollableStack';
import { useUserChatsQuery } from '@/redux/services/loggedUserAPI';
import { TopbarPopperProps } from '../NavBar/RightSection/types';
import ListUser from './ListUser';
import { StyledContentWrapper, StyledRoot } from './styles';

export default function ChatsListPopper({ sx, open, anchorEl, ...rootProps }: TopbarPopperProps) {
  const theme = useTheme();
  const { data: usersChats } = useUserChatsQuery({});
  return (
    <StyledRoot sx={sx} {...rootProps} open={open} anchorEl={anchorEl}>
      <StyledContentWrapper>
        <ScrollableStack padding={1}>
          <Box p={0.5}>
            <Typography variant='h3' fontWeight={700}>
              Chats
            </Typography>
            <TextField
              variant='outlined'
              size='small'
              fullWidth
              placeholder='Search Contacts'
              InputProps={{
                sx: {
                  fontSize: '1rem',
                  borderRadius: '50px',
                  height: '35px',
                  mt: theme.spacing(1.5),
                  color: theme.palette.text.secondary,
                  fontWeight: 350,
                  backgroundColor: theme.palette.secondary.main,
                },
                startAdornment: (
                  <InputAdornment position='start'>
                    <Icon icon='search' fontSize={16} color={theme.palette.text.secondary} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <List>
            {usersChats?.map((chat) => (
              <ListUser key={chat.id} chat={chat} />
            ))}
          </List>
        </ScrollableStack>
      </StyledContentWrapper>
    </StyledRoot>
  );
}
