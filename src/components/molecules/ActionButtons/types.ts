import { IRefetchElementHadler, TElementType, TPostOrPictureObj } from '@/types/misc';
import { BoxProps } from '@mui/material';

export interface ActionButtonsProps extends BoxProps {
  element: TPostOrPictureObj;
  elementType: TElementType;
  refetchElement: IRefetchElementHadler;
  handleCommentClick: () => void;
}
