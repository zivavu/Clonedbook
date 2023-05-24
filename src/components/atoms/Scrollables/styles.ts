import { Box, CSSObject, Stack, Theme, styled } from '@mui/material';

const getScrollableStyles = (theme: Theme) => {
  return {
    overflowX: 'hidden',
    overflowY: 'scroll',

    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: `8px`,
    },
    scrollbarColor: `transparent transparent`,
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.secondary.main,
      borderRadius: '8px',
    },
    '&:hover::-webkit-scrollbar-thumb': {
      background: theme.palette.text.disabled,
    },
    '&:hover': {
      scrollbarColor: `${theme.palette.text.disabled}${theme.palette.secondary.main}`,
    },
  } as CSSObject;
};

const getInvisibleScrollStyles = (theme: Theme) => {
  return {
    overflowX: 'hidden',
    overflowY: 'auto',

    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: `0`,
    },
    scrollbarColor: `transparent transparent`,
    '&::-webkit-scrollbar-thumb': {
      background: 'taransparent',
      borderRadius: '8',
    },
    '&:hover::-webkit-scrollbar-thumb': {
      background: 'taransparent',
    },
    '&:hover': {
      scrollbarColor: 'taransparent',
    },
  } as CSSObject;
};

export const StyledScrollableBox = styled(Box)(({ theme }) => ({
  ...getScrollableStyles(theme),
}));

export const StyledScrollableStack = styled(Stack)(({ theme }) => ({
  ...getScrollableStyles(theme),
}));

export const StyledInvisibleScrollableStack = styled(Stack)(({ theme }) => ({
  ...getInvisibleScrollStyles(theme),
}));
