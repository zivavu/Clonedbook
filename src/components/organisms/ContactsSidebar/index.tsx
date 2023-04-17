import { addUsersToDB } from '@/utils/generateRandomUsers';
import { Typography, useTheme } from '@mui/material';
import { StyledRoot } from './styles';
import { ContactsSidebarProps } from './types';
export default function ContactsSidebar({ ...rootProps }: ContactsSidebarProps) {
	const theme = useTheme();
	return (
		<StyledRoot {...rootProps}>
			<Typography>ContactsSidebar</Typography>
		</StyledRoot>
	);
}
