import { Stack, Typography, useTheme } from '@mui/material';

import Icon from '@/components/atoms/Icon/Icon';
import Link from '@/components/atoms/Link';
import { TextAccountDetailProps } from '../../types';
import { StyledTextDetailValue } from './styles';

export default function TextAccountDetail({
  accountDetail,
  iconSize = 24,
  showPlaceholder = true,
  allowWrap,
  sx,
  ...rootProps
}: TextAccountDetailProps) {
  const theme = useTheme();
  const { icon, label, value, valueLink } = accountDetail;
  const placeholder = accountDetail.placeholder || "Didn't specified";
  const showingPlaceholder = showPlaceholder && placeholder && !value;
  if ((!value || !icon) && !showingPlaceholder) return null;
  return (
    <Stack key={label} direction='row' alignItems='center' spacing={0.5} sx={sx} {...rootProps}>
      <Icon icon={icon} width='30px' fontSize={iconSize} color={theme.palette.grey['500']} />
      <Typography
        variant='subtitle2'
        color={showingPlaceholder ? theme.palette.text.secondary : theme.palette.text.primary}
        sx={{
          whiteSpace: 'nowrap',
        }}
        fontWeight='360'
        pl={0.5}>
        {showingPlaceholder ? placeholder : label}
      </Typography>
      {valueLink ? (
        <Link href={valueLink}>
          <StyledTextDetailValue
            variant='subtitle2'
            fontWeight='500'
            sx={{
              whiteSpace: allowWrap ? 'break-spaces' : 'nowrap',
            }}>
            {value}
          </StyledTextDetailValue>
        </Link>
      ) : (
        <StyledTextDetailValue
          variant='subtitle2'
          fontWeight='500'
          sx={{
            whiteSpace: allowWrap ? 'break-spaces' : 'nowrap',
          }}>
          {value}
        </StyledTextDetailValue>
      )}
    </Stack>
  );
}
