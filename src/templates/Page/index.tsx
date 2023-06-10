import { StyledRoot } from './styles';

import NavBar from '@/components/organisms/NavBar';
import OpenedChatsPortal from '@/components/organisms/OpenedChatsPortal';
import Head from 'next/head';
import { PageProps } from './types';

export default function Page({ children, title, description }: PageProps) {
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
