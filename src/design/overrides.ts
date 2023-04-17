import { PaletteOptions } from '@mui/material';

export const componentOverrides = (palette: PaletteOptions) => {
	return {
		a: {
			styleOverrides: {
				color: palette.text?.primary,
				textDecoration: 'none',
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					minHeight: '100vh',
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'& fieldset': {
						border: 'none',
					},
					'& ::placeholder': {
						color: palette.text?.secondary,
					},
					borderRadius: '50px',
					//@ts-ignore
					backgroundColor: palette.secondary?.main,
				},
			},
		},
		MuiToggleButton: {
			styleOverrides: {
				root: {
					border: 'none',
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 5px',
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					borderRadius: '8px',
				},
			},
		},
	};
};
