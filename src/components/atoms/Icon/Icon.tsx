import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NoSsr, useTheme } from '@mui/material';
import { IconProps } from './types';

const Icon = ({ classes, ...rootProps }: IconProps) => {
  const theme = useTheme();

  return (
    <NoSsr>
      <FontAwesomeIcon
        className={classes?.root}
        color={
          theme.palette.mode === 'light' ? theme.palette.text.secondary : theme.palette.text.primary
        }
        {...rootProps}
      />
    </NoSsr>
  );
};

export default Icon;
