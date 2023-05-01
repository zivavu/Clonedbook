import { Typography } from '@mui/material';

import { StyledErrorAlert, StyledRoot } from './styles';

import { useEffect } from 'react';
import { ErrorsFeedProps } from './types';

export default function ErrorsFeed({ errors, setErrors, sx, ...rootProps }: ErrorsFeedProps) {
  useEffect(() => {
    let errorTimeout: ReturnType<typeof setTimeout>;
    if (errors.length > 0) {
      errorTimeout = setTimeout(() => {
        setErrors([]);
      }, 3000);
    }
    return () => {
      clearTimeout(errorTimeout);
    };
  }, [errors, setErrors]);
  return errors.length > 0 ? (
    <StyledRoot sx={sx} {...rootProps}>
      {errors.map((error, i) => (
        <StyledErrorAlert key={error.content + i} severity={error.sevariety} variant='filled'>
          <Typography>{error.content}</Typography>
        </StyledErrorAlert>
      ))}
    </StyledRoot>
  ) : null;
}
