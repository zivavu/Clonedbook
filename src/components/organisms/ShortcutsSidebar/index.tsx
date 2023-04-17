import { List, Typography, useTheme } from '@mui/material';

import { StyledListItem, StyledListItemAvatar, StyledRoot } from './styles';

import { PlaceholderIcon } from '@/assets/icons';
import { sidebarItems } from './data';
import { ShortcutsSidebarProps } from './types';

export default function ShortcutsSidebar({ ...rootProps }: ShortcutsSidebarProps) {
	return (
		<StyledRoot {...rootProps}>
			<List sx={{ width: '100%' }}>
				<StyledListItem>
					<StyledListItemAvatar src='https://i.pravatar.cc/300' alt='Avatar' />
					<Typography fontSize={'0.85rem'}>User Name</Typography>
				</StyledListItem>
				{sidebarItems.map((item) => {
					const { key, icon, ...rest } = item;

					return (
						<StyledListItem key={key} {...rest}>
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
