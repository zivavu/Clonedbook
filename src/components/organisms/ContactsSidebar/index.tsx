import { Typography } from '@mui/material';
import { StyledRoot } from './styles';
import { ContactsSidebarProps } from './types';
export default function ContactsSidebar({ ...rootProps }: ContactsSidebarProps) {
	return (
		<StyledRoot {...rootProps}>
			<Typography>ContactsSidebar</Typography>
		</StyledRoot>
	);
}
