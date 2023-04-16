import { createTheme } from '@mui/material/styles';
import { componentOverrides } from './overrides';

export const theme = createTheme({
	palette: {
		primary: {
			main: `#4267B2`,
		},
		secondary: {
			main: `#17A9FD`,
		},
		contrastThreshold: 3,
	},

	components: componentOverrides,
});
