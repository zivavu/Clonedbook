import { TElementType, TPostOrPictureObj } from '@/types/misc';
import { BoxProps } from '@mui/material';

export interface ElementInfoProps extends BoxProps {
  element: TPostOrPictureObj;
  type: TElementType;
  refetchElement: () => void;
}
