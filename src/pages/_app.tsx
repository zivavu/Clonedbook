import { db } from '@/config/firebase.config';
import { theme } from '@/libs/design/theme';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

