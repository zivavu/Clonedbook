import { Box, List, Typography, useTheme } from '@mui/material';

import { StyledIconContainer, StyledListItemButton } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import { TabSelectListProps } from './types';

export default function TabSelectList({
  currentTab,
  setCurrentTab,
  sx,
  ...rootProps
}: TabSelectListProps) {
  const theme = useTheme();
  return (
    <Box sx={sx} {...rootProps}>
      <Typography variant='h3' fontWeight={700} ml={1} mb={0.5}>
        Friends
      </Typography>
      <List>
        <StyledListItemButton
          selected={currentTab === 'home'}
          onClick={() => setCurrentTab('home')}>
          <StyledIconContainer sx={{ backgroundColor: theme.palette.primary.main }}>
            <Icon fontSize={18} icon='house-user' />
          </StyledIconContainer>
          <Typography variant='subtitle1'>Home</Typography>
        </StyledListItemButton>

        <StyledListItemButton
          selected={currentTab === 'recieved_requests'}
          onClick={() => setCurrentTab('recieved_requests')}>
          <StyledIconContainer>
            <Icon fontSize={18} icon='user-check' />
          </StyledIconContainer>
          <Typography variant='subtitle1'>Friend Requests</Typography>
          <Icon icon='angle-right' fontSize={20} style={{ marginLeft: 'auto' }} />
        </StyledListItemButton>

        <StyledListItemButton
          selected={currentTab === 'suggestions'}
          onClick={() => setCurrentTab('suggestions')}>
          <StyledIconContainer>
            <Icon fontSize={18} icon='user-plus' />
          </StyledIconContainer>
          <Typography variant='subtitle1'>Suggestions</Typography>
          <Icon icon='angle-right' fontSize={20} style={{ marginLeft: 'auto' }} />
        </StyledListItemButton>

        <StyledListItemButton
          selected={currentTab === 'all_friends'}
          onClick={() => setCurrentTab('all_friends')}>
          <StyledIconContainer>
            <Icon fontSize={18} icon='users-line' />
          </StyledIconContainer>
          <Typography variant='subtitle1'>All Friends</Typography>
          <Icon icon='angle-right' fontSize={20} style={{ marginLeft: 'auto' }} />
        </StyledListItemButton>
      </List>
    </Box>
  );
}
