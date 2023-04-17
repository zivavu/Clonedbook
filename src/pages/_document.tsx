import { getInitColorSchemeScript } from '@mui/material';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        {getInitColorSchemeScript({ defaultMode: 'light' })}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
