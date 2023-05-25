import { theme } from '@/design/theme';
import { config, library } from '@fortawesome/fontawesome-svg-core';

import { faComment, faShareSquare, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
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
  faLocationDot,
  faMagnifyingGlass,
  faPeopleGroup,
  faPhone,
  faSchool,
  faUserCheck,
  faUserPlus,
  faUserTie,
  faUserXmark,
  faVenusMars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';

import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

import { store } from '@/store';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Provider } from 'react-redux';
config.autoAddCss = false;

const icons = [
  faShareSquare,
  faHouse,
  faClapperboard,
  faMagnifyingGlass,
  faPeopleGroup,
  faFacebookMessenger,
  faBell,
  faEllipsis,
  faComment,
  faThumbsUp,
  faUserCheck,
  faUserPlus,
  faCaretDown,
  faXmark,
  faUserXmark,
  faAngleRight,
  faAngleLeft,
  faGlobeAfrica,
  faUserTie,
  faSchool,
  faVenusMars,
  faBirthdayCake,
  faPhone,
  faEnvelope,
  faFileCirclePlus,
  faHouse,
  faLocationDot,
  faHeart,
  faGraduationCap,
  faBriefcase,
] as any;
library.add(...icons);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* @ts-ignore Server Component */}
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}
