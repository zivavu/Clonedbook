import { useIsBrowser } from '@/utils/useIsBrowser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProps } from './types';

const Icon = ({ classes, ...rootProps }: IconProps) => {
	const isBrowser = useIsBrowser();
	if (!isBrowser) return null;

	return <FontAwesomeIcon className={classes?.root} {...rootProps} />;
};

export default Icon;
