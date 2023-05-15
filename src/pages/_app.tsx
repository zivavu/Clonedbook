import { theme } from '@/design/theme';
import { config, library } from '@fortawesome/fontawesome-svg-core';

import { faComment, faShareSquare, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faBell,
  faClapperboard,
  faEllipsis,
  faFileCirclePlus,
  faGlobeAfrica,
  faHouse,
  faMagnifyingGlass,
  faPeopleGroup,
  faUserCheck,
  faUserPlus,
  faUserXmark,
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
  faXmark,
  faUserXmark,
  faAngleRight,
  faAngleLeft,
  faGlobeAfrica,
  faFileCirclePlus,
] as any;
library.add(...icons);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* @ts-expect-error Server Component */}
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}
