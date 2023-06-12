import { TElementType, TPostOrPictureObj } from '@/types/misc';
import { BoxProps } from '@mui/material';

export interface ActionButtonsProps extends BoxProps {
  element: TPostOrPictureObj;
  elementType: TElementType;
  refetchElement: () => void;
  handleCommentClick: () => void;
}
