import { InputAdornment, TextField, Typography, useTheme, useThemeProps } from '@mui/material';

import { StyledRoot } from './styles';

import Icon from '@/components/Icon/Icon';
import Image from 'next/image';
import { LeftSectionProps } from './types';

export default function LeftSection({ sx, classes, ...rootProps }: LeftSectionProps) {
	const theme = useTheme();
	return (
		<StyledRoot sx={sx} className={classes?.root} {...rootProps}>
			<Image src='/facebook-logo.svg' width={50} height={50} alt='Site logo'></Image>
			<TextField
				variant='outlined'
				placeholder='Search Facebook'
				size='small'
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Icon icon='search' />
						</InputAdornment>
					),
				}}
			></TextField>
		</StyledRoot>
	);
}
