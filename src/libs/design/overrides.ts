import { Components, Theme } from '@mui/material';

export const componentOverrides = {
	MuiCssBaseline: {
		styleOverrides: {
			body: {
				minHeight: `100vh`,
			},
			'#__next': {
				minHeight: `100vh`,
				display: `flex`,
				flexDirection: `column`,
			},
		},
	},
};
