import { useTheme } from '@mui/material';

import ShortcutsSidebar from '@/components/organisms/ShortcutsSidebar';
import { StyledRoot } from './styles';
import { HomeProps } from './types';

export default function Home({ ...rootProps }: HomeProps) {
	const theme = useTheme();
	return (
		<StyledRoot {...rootProps}>
			<ShortcutsSidebar />
		</StyledRoot>
	);
}
