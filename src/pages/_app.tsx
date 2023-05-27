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
  faEnvelopesBulk,
  faFileCirclePlus,
  faGlobeAfrica,
  faGraduationCap,
  faHeart,
  faHouse,
  faLocationDot,
  faMagnifyingGlass,
  faMoon,
  faPeopleGroup,
  faPhone,
  faRepeat,
  faSchool,
  faSun,
  faUser,
  faUserCheck,
  faUserPlus,
  faUserTie,
  faUserXmark,
  faVenusMars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';

import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

import ThemeModeProvider from '@/design/ThemeModeProvider';
import { store } from '@/redux/store';
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
  faMoon,
  faSun,
  faEnvelopesBulk,
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
  faRepeat,
  faUser,
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
        <ThemeModeProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeModeProvider>
      </Provider>
    </>
  );
}
