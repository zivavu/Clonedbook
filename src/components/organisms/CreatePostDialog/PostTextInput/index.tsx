import { StyledPostTextField } from './styles';

import { useState } from 'react';
import { PostTextInputProps } from './types';

export default function PostTextInput({ postTextRef, user, postPhotos }: PostTextInputProps) {
  const [fieldValue, setFieldValue] = useState('');

  const placeholder = `What's on your mind, ${user.firstName}?`;
  const textLines = fieldValue.match(/\n/g)?.length || 0 + 1;
  const isTextLong = fieldValue.length > 85 || textLines > 3 || postPhotos.length > 0;

  return (
    <StyledPostTextField
      variant='outlined'
      multiline
      placeholder={placeholder}
      onChange={(e) => {
        postTextRef.current = e.target.value;
        setFieldValue(e.target.value);
      }}
      value={fieldValue}
      sx={{
        '& .MuiOutlinedInput-root': {
          fontSize: isTextLong ? '0.95rem' : '1.5rem',
        },
      }}
    />
  );
}
