import { getInitColorSchemeScript } from '@mui/material';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body style={{ overflowX: 'scroll' }}>
        {getInitColorSchemeScript({ defaultMode: 'system' })}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
