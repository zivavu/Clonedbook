import { Typography, useTheme } from '@mui/material';

import { StyledErrorAlert, StyledRoot } from './styles';

import { useEffect } from 'react';
import { ErrorsFeedProps } from './types';

export default function StatusFeed({ status, setStatus, sx, ...rootProps }: ErrorsFeedProps) {
  const theme = useTheme();
  useEffect(() => {
    let errorTimeout: ReturnType<typeof setTimeout>;
    if (status.length > 0) {
      errorTimeout = setTimeout(() => {
        setStatus([]);
      }, 3000);
    }
    return () => {
      clearTimeout(errorTimeout);
    };
  }, [status, setStatus]);
  return status.length > 0 ? (
    <StyledRoot sx={sx} {...rootProps}>
      {status.map((status, i) => (
        <StyledErrorAlert
          key={status.content + i}
          severity={status.sevariety}
          sx={{
            color:
              status.sevariety === 'info' || status.sevariety === 'error'
                ? theme.palette.common.white
                : theme.palette.common.black,
          }}
          variant='filled'>
          <Typography>{status.content}</Typography>
        </StyledErrorAlert>
      ))}
    </StyledRoot>
  ) : null;
}
