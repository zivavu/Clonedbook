import { Box } from '@mui/material';

import ElementTextEditInput from '@/components/molecules/ElementTextEditInput';
import TextViewArea from './TextViewArea';
import { PostTextAreaProps } from './types';

export default function PostTextArea({
  post,
  refetchPost,
  handleCloseEditMode,
  isInEditMode,
  sx,
  ...rootProps
}: PostTextAreaProps) {
  const { text, pictures } = post;

  const hasPictures = !!pictures && pictures[0] ? true : false;
  const hasText = !!text ? true : false;
  const isTextLong = (text && text.length > 130) || hasPictures ? true : false;

  return (
    <Box pt={1} sx={sx} {...rootProps} width='100%'>
      {isInEditMode ? (
        <ElementTextEditInput
          element={post}
          elementType='post'
          handleCloseEditMode={handleCloseEditMode}
          refetchElement={refetchPost}
        />
      ) : (
        hasText && (
          <Box data-testid='post-text-content'>
            <TextViewArea text={text} />
          </Box>
        )
      )}
    </Box>
  );
}
