import { Box, SvgIcon, useTheme } from '@mui/material';
import { ReactionIconProps } from './types';

import {
  AngryIcon,
  CareIcon,
  HahaIcon,
  LikeIcon,
  LoveIcon,
  SadIcon,
  WowIcon,
} from '@/assets/reactionIcons';

const iconMap = {
  like: LikeIcon,
  love: LoveIcon,
  care: CareIcon,
  haha: HahaIcon,
  wow: WowIcon,
  sad: SadIcon,
  angry: AngryIcon,
};

export default function ReactionIcon({
  type,
  alt,
  size = 22,
  overlap = true,
  showBorder = true,
  zIndex,
  sx,
  ...rootProps
}: ReactionIconProps) {
  const theme = useTheme();
  const imageBorder = showBorder ? `2px solid ${theme.palette.background.paper}` : 'none';

  const ReactionIcon = (type && iconMap[type]) || LikeIcon;

  return (
    <Box
      sx={{
        zIndex: zIndex || 0,
        marginRight: overlap ? `-4px` : '',
        width: `${size}px`,
        height: `${size}px`,
        border: imageBorder,
        borderRadius: '50%',
        ...sx,
      }}
      {...rootProps}>
      <SvgIcon component={ReactionIcon} viewBox='0 0 16 16' sx={{ width: size, height: size }} />
    </Box>
  );
}
