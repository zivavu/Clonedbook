import { BoxProps, List, Typography, useTheme } from '@mui/material';

import { StyledListItemAvatar, StyledListItem as StyledListItemButton, StyledRoot } from './styles';

import { PlaceholderIcon } from '@/assets/pageIcons';
import UserAvatar from '@/components/atoms/UserAvatar';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useRouter } from 'next/router';
import { sidebarItems } from './sidebarItemsData';

export default function ShortcutsSidebar({ sx, ...rootProps }: BoxProps) {
  const router = useRouter();
  const theme = useTheme();
  const { data: user } = useGetLoggedUserQuery({});

  const handleRedirect = (href: string) => {
    router.push(href);
  };

  return (
    <StyledRoot sx={sx} {...rootProps}>
      <List sx={{ width: '100%' }}>
        <StyledListItemButton onClick={() => handleRedirect('profile')}>
          <UserAvatar size={36} sx={{ mr: theme.spacing(1.5) }} userId={user?.id} />
          <Typography variant='body1'>
            {user?.firstName} {user?.lastName}
          </Typography>
        </StyledListItemButton>
        {sidebarItems.map((item) => {
          const { key, icon, href, active } = item;
          const isActive = active && href;
          return (
            <StyledListItemButton
              key={key}
              onClick={() => {
                if (!isActive) return;
                handleRedirect(href);
              }}
              disabled={!isActive}>
              <StyledListItemAvatar src={icon || PlaceholderIcon} alt={key}></StyledListItemAvatar>
              <Typography textTransform={'capitalize'} variant='body1'>
                {key.split('-').join(' ')}
              </Typography>
            </StyledListItemButton>
          );
        })}
      </List>
    </StyledRoot>
  );
}
