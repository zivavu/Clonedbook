import { setMaxChats } from '@/redux/features/openedChatsSlice';
import { RootState } from '@/redux/store';
import { useMediaQuery, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function getMaxChatsByScreenSize(screenSize: 'lg' | 'md' | 'sm') {
  return screenSize === 'lg' ? 3 : screenSize === 'md' ? 2 : 1;
}

export default function useSetMaxChatsMediaQuery() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentMaxChats = useSelector((state: RootState) => state.openedChats.maxChats);

  const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));
  const currentScreenSize = isLgScreen ? 'lg' : isMdScreen ? 'md' : 'sm';

  useEffect(() => {
    const maxChats = getMaxChatsByScreenSize(currentScreenSize);
    if (maxChats !== currentMaxChats) dispatch(setMaxChats(maxChats));
  }, [isLgScreen, isMdScreen]);
}
