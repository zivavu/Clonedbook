import { IUserBasicInfo } from '@/types/user';
import { BoxProps } from '@mui/material';
import { ImageProps } from 'next/image';

export interface UserAvatarProps extends BoxProps {
  userId?: string;
  alt?: string;
  size?: number;
  //Used for next/image optimization
  sizes?: string;
  useLink?: boolean;
  usePopper?: boolean;
  showBorder?: boolean;
}

export interface UserImageProps extends Omit<ImageProps, 'alt' | 'src'> {
  user: Omit<IUserBasicInfo, 'id'> | null;
  alt?: string;
}
