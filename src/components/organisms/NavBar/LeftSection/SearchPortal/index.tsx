import {
  Box,
  ClickAwayListener,
  Fade,
  IconButton,
  ListItem,
  Portal,
  Typography,
  useTheme,
} from '@mui/material';

import Icon from '@/components/atoms/Icon/Icon';
import ScrollableStack from '@/components/atoms/scrollables/ScrollableStack';
import { NAVBAR_HEIGHT } from '../..';
import FriendListItem from './FriendListItem';
import { StyledPopperContent } from './styles';
import { SearchPortalProps } from './types';

export default function SearchPortal({
  userHits,
  searchTerm,
  searchElement,
  open,
  setOpen,
  ...rootProps
}: SearchPortalProps) {
  const theme = useTheme();
  return (
    <Portal {...rootProps} disablePortal>
      <ClickAwayListener
        onClickAway={(e) => {
          if (searchElement?.contains(e.target as Node)) return;
          setOpen(false);
        }}>
        <Fade in={open}>
          <StyledPopperContent>
            <Box height={NAVBAR_HEIGHT}>
              <IconButton
                onClick={() => setOpen(false)}
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '6px',
                  width: '40px',
                  height: '40px',
                }}>
                <Icon icon='arrow-left' fontSize={18} />
              </IconButton>
            </Box>
            <ScrollableStack
              sx={{
                padding: theme.spacing(0, 1),
                paddingBottom: theme.spacing(1),
                overflowY: 'auto',
                maxHeight: 'min(80vh, 700px)',
              }}>
              {userHits?.map((userId) => (
                <FriendListItem
                  key={userId}
                  userId={userId}
                  data-testid={`search-result-list-item-${userId}`}
                />
              ))}
              {userHits?.length === 0 ? (
                !searchTerm ? (
                  <ListItem sx={{ justifyContent: 'center' }}>
                    <Typography>Start typing to find users</Typography>
                  </ListItem>
                ) : (
                  <ListItem sx={{ justifyContent: 'center' }}>
                    <Typography>No users found...</Typography>
                  </ListItem>
                )
              ) : null}
            </ScrollableStack>
          </StyledPopperContent>
        </Fade>
      </ClickAwayListener>
    </Portal>
  );
}
