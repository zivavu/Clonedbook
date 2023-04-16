import { AppBar, useTheme } from '@mui/material';

import { StyledContentContainer, StyledContentSection, StyledRoot } from './styles';

import LeftSection from './comps/LeftSection';
import MiddleSection from './comps/MiddleSection';
import RightSection from './comps/RightSection';
import { NavBarProps } from './types';

export default function NavBar({ sx, classes, ...rootProps }: NavBarProps) {
	const theme = useTheme();
	return (
		<StyledRoot sx={sx} className={classes?.root} {...rootProps}>
			<AppBar sx={{ backgroundColor: theme.palette.secondary.light }}>
				<StyledContentContainer>
					<LeftSection />
					<MiddleSection />
					<RightSection />
				</StyledContentContainer>
			</AppBar>
		</StyledRoot>
	);
}
