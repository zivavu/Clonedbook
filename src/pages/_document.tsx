import { getInitColorSchemeScript } from '@mui/material';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
        {getInitColorSchemeScript({ defaultMode: 'system' })}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
