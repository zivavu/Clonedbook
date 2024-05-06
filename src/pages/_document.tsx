import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

import createEmotionCache from '@/design/createEmotionCache';
import createEmotionServer from '@emotion/server/create-instance';
import { AppType } from 'next/app';
import { EmotionAppProps } from './_app';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';

interface EmotionDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function MyDocument({ emotionStyleTags }: EmotionDocumentProps) {
  return (
    <Html lang='en' suppressHydrationWarning>
      <Head>
        <meta name='emotion-insertion-point' content='' />
        {emotionStyleTags}
      </Head>
      <body style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: React.ComponentType<React.ComponentProps<AppType> & EmotionAppProps>) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
