import { faComment, faShareSquare, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
  faBell,
  faBirthdayCake,
  faBriefcase,
  faCaretDown,
  faClapperboard,
  faEllipsis,
  faEnvelope,
  faFileCirclePlus,
  faGlobeAfrica,
  faGraduationCap,
  faHeart,
  faHouse,
  faHouseUser,
  faLocationDot,
  faMagnifyingGlass,
  faMoon,
  faPaperPlane,
  faPenToSquare,
  faPeopleGroup,
  faPhone,
  faPlusCircle,
  faRepeat,
  faRightToBracket,
  faSchool,
  faSun,
  faUser,
  faUserCheck,
  faUserGear,
  faUserPlus,
  faUserTie,
  faUserXmark,
  faUsers,
  faUsersLine,
  faVenusMars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import type { AppProps } from 'next/app';

import { faFacebookMessenger, faGithub } from '@fortawesome/free-brands-svg-icons';

import NavBar from '@/components/organisms/NavBar';
import OpenedChatsPortal from '@/components/organisms/OpenedChatsPortal';
import ThemeModeProvider from '@/design/ThemeModeProvider';
import createEmotionCache from '@/design/createEmotionCache';
import { store } from '@/redux/store';
import { EmotionCache, CacheProvider as EmotionCacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Provider as StoreProvider } from 'react-redux';

import '@fortawesome/fontawesome-svg-core/styles.css';
const { library, config } = require('@fortawesome/fontawesome-svg-core');

// Prevent fontawesome from adding its CSS since we did it manually above:
config.autoAddCss = false; /* eslint-disable import/first */

/**
 * Import FontAwesome icons.
 * This is required, else the icon wont show up!
 * Read more: https://fontawesome.com/v5/docs/web/use-with/react#using-icons-via-global-use
 */
const icons = [
  faShareSquare,
  faHouse,
  faClapperboard,
  faMagnifyingGlass,
  faPeopleGroup,
  faFacebookMessenger,
  faBell,
  faPenToSquare,
  faEllipsis,
  faComment,
  faThumbsUp,
  faCaretDown,
  faMoon,
  faArrowLeft,
  faSun,
  faXmark,
  faAngleRight,
  faAngleLeft,
  faGlobeAfrica,
  faSchool,
  faVenusMars,
  faBirthdayCake,
  faPhone,
  faEnvelope,
  faRepeat,
  faRightToBracket,
  faUserCheck,
  faUserPlus,
  faUserGear,
  faUserXmark,
  faUserTie,
  faUsersLine,
  faHouseUser,
  faUser,
  faUsers,
  faFileCirclePlus,
  faHouse,
  faLocationDot,
  faHeart,
  faGraduationCap,
  faBriefcase,
  faGithub,
  faPaperPlane,
  faPlusCircle,
  faEllipsis,
] as any;
library.add(...icons);

const localEmotionCache = createEmotionCache();

export interface EmotionAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: EmotionAppProps) {
  const { Component, emotionCache = localEmotionCache, pageProps } = props;
  return (
    <NextThemesProvider themes={['dark', 'light']} defaultTheme='dark'>
      <EmotionCacheProvider value={emotionCache}>
        <ThemeModeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StoreProvider store={store}>
              <NavBar />
              <Component {...pageProps} />
              <OpenedChatsPortal />
            </StoreProvider>
          </LocalizationProvider>
        </ThemeModeProvider>
      </EmotionCacheProvider>
    </NextThemesProvider>
  );
}
