import { SvgIcon, useTheme } from '@mui/material';
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
import { StyledRoot } from './styles';

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

  const ReactionIcon = (type && iconMap[type]) || LikeIcon;

  return (
    <StyledRoot
      sx={{
        width: `${size}px`,
        height: `${size}px`,
        marginRight: overlap ? `-4px` : '0',
        outline: showBorder ? `2px solid ${theme.palette.background.paper}` : 'none',
        ...sx,
      }}
      {...rootProps}>
      <SvgIcon
        component={ReactionIcon}
        viewBox='0 0 16 16'
        sx={{
          zIndex: zIndex || 0,
          width: `${size - 2}px`,
          height: `${size - 2}px`,
        }}
      />
    </StyledRoot>
  );
}
