import { List, Typography, useTheme } from '@mui/material';

import { StyledListItem, StyledListItemAvatar, StyledRoot } from './styles';

import { PlaceholderIcon } from '@/assets/pageIcons';
import UserAvatar from '@/components/atoms/UserAvatar';
import { useFetchUserQuery } from '@/features/userAPI';
import { useRouter } from 'next/router';
import { sidebarItems } from './data';
import { ShortcutsSidebarProps } from './types';

export default function ShortcutsSidebar({ ...rootProps }: ShortcutsSidebarProps) {
  const router = useRouter();
  const theme = useTheme();
  const { data: user } = useFetchUserQuery({});

  const handleRedirect = (href: string) => {
    router.push(href);
  };
  return (
    <StyledRoot {...rootProps}>
      <List sx={{ width: '100%' }}>
        <StyledListItem>
          <UserAvatar size={36} sx={{ mr: theme.spacing(1.5) }} />
          <Typography fontSize={'0.85rem'}>
            {user?.firstName} {user?.lastName}
          </Typography>
        </StyledListItem>

        {sidebarItems.map((item) => {
          const { key, icon, href, active } = item;
          const isActive = active && href;
          return (
            <StyledListItem
              key={key}
              onClick={() => {
                if (!isActive) return;
                handleRedirect(href);
              }}
              disabled={!isActive}
            >
              <StyledListItemAvatar src={icon || PlaceholderIcon} alt={key}></StyledListItemAvatar>
              <Typography textTransform={'capitalize'} fontSize={'0.85rem'}>
                {key.split('-').join(' ')}
              </Typography>
            </StyledListItem>
          );
        })}
      </List>
    </StyledRoot>
  );
}
