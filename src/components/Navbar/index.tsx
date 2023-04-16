// Dependencies scoped imports
import { Typography } from '@mui/material';

// Project scoped imports

// Module scoped imports
import { StyledRoot } from './styles';
import { NavbarProps } from './types';

export default function Navbar({ sx, classes, ...rootProps }: NavbarProps) {
	return (
		<StyledRoot sx={sx} className={classes?.root} {...rootProps}>
			<Typography>Navbar</Typography>
		</StyledRoot>
	);
}
