import { PaletteOptions } from '@mui/material';

export const componentOverrides = (palette: PaletteOptions) => {
	return {
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
	};
};
