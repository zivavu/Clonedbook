import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NoSsr } from '@mui/material';
import { IconProps } from './types';

const Icon = ({ classes, ...rootProps }: IconProps) => {
  return (
    <NoSsr>
      <FontAwesomeIcon className={classes?.root} {...rootProps} />
    </NoSsr>
  );
};

export default Icon;
