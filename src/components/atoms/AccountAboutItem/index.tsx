import { Stack, Typography, useTheme } from '@mui/material';

import Icon from '../Icon/Icon';
import Link from '../Link';
import { AccountAboutItemProps } from './types';

export default function AccountAboutItem({
  label,
  value,
  icon,
  valueLink,
  iconSize = 24,
  sx,
  ...rootProps
}: AccountAboutItemProps) {
  const theme = useTheme();
  return (
    <Stack key={label} direction='row' alignItems='center' spacing={0.5} sx={sx} {...rootProps}>
      <Icon icon={icon} width='30px' fontSize={20} color={theme.palette.grey['500']} />
      <Typography variant='subtitle2' fontWeight='360' pl={0.5}>
        {label}
      </Typography>
      {valueLink ? (
        <Link href={valueLink}>
          <Typography variant='subtitle2' fontWeight='400'>
            {value}
          </Typography>
        </Link>
      ) : (
        <Typography variant='subtitle2' fontWeight='400'>
          {value}
        </Typography>
      )}
    </Stack>
  );
}
