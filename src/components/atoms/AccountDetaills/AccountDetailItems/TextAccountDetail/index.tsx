import { Stack, Typography, useTheme } from '@mui/material';

import Icon from '../../../Icon/Icon';
import Link from '../../../Link';
import { TextAccountDetailProps } from '../../types';

export default function TextAccountDetail({
  accountDetail,
  iconSize = 24,
  showPlaceholder = true,
  sx,
  ...rootProps
}: TextAccountDetailProps) {
  const theme = useTheme();
  const { icon, label, value, valueLink, placeholder } = accountDetail;
  const showingPlaceholder = showPlaceholder && placeholder && !value;
  if ((!value || !icon) && !showingPlaceholder) return null;
  return (
    <Stack key={label} direction='row' alignItems='center' spacing={0.5} sx={sx} {...rootProps}>
      <Icon icon={icon} width='30px' fontSize={iconSize} color={theme.palette.grey['500']} />
      <Typography
        variant='subtitle2'
        color={showingPlaceholder ? theme.palette.text.secondary : theme.palette.text.primary}
        fontWeight='360'
        pl={0.5}>
        {showingPlaceholder ? placeholder : label}
      </Typography>
      {valueLink ? (
        <Link href={valueLink}>
          <Typography variant='subtitle2' fontWeight='500'>
            {value}
          </Typography>
        </Link>
      ) : (
        <Typography variant='subtitle2' fontWeight='500'>
          {value}
        </Typography>
      )}
    </Stack>
  );
}
