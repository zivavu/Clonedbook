import { StyledRoot } from './styles';

import Head from 'next/head';
import { PageProps } from './types';

export default function PageTemplate({ children, title, description }: PageProps) {
  return (
    <>
      <Head>
        <title>{title || 'Clonedbook'}</title>
        <meta name='description' content={description || 'Miserable clone of Mark&#39;s empire.'} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <StyledRoot>
        <main>{children}</main>
      </StyledRoot>
    </>
  );
}
