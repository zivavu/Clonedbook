import { Box, useTheme } from '@mui/material';

import {
  AngryIcon,
  CareIcon,
  HeartIcon,
  LaughIcon,
  LikeIcon,
  SadIcon,
  WowIcon,
} from '@/assets/reactionIcons';

import Image from 'next/image';
import { ReactionIconProps } from './types';

export default function ReactionIcon({
  src,
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
  const imageBorder = showBorder ? `2px solid ${theme.palette.secondary.light}` : 'none';

  switch (type) {
    case 'like':
      src = LikeIcon;
      break;
    case 'love':
      src = HeartIcon;
      break;
    case 'care':
      src = CareIcon;
      break;
    case 'haha':
      src = LaughIcon;
      break;
    case 'wow':
      src = WowIcon;
      break;
    case 'sad':
      src = SadIcon;
      break;
    case 'angry':
      src = AngryIcon;
      break;
  }

  src = size > 30 ? src?.slice(0, -1) + '2' : src;
  return (
    <Box
      sx={{
        zIndex: zIndex || 0,
        marginRight: overlap ? `-4px` : '',
        width: `${size}px`,
        height: `${size}px`,
        ...sx,
      }}
      {...rootProps}>
      <Image
        unoptimized
        width={size}
        height={size}
        loading='eager'
        src={src || LikeIcon}
        alt={alt || 'reaction icon'}
        style={{
          border: imageBorder,
          borderRadius: '50%',
        }}
      />
    </Box>
  );
}
