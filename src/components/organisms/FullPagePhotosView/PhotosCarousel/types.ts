import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface PhotosCarouselProps extends BoxProps {
  post: IPost;
  initialPhoto: string;
}
