import { useTheme } from '@mui/material';

import ContactsSidebar from '@/components/organisms/ContactsSidebar';
import HomeWall from '@/components/organisms/HomeWall';
import ShortcutsSidebar from '@/components/organisms/ShortcutsSidebar';
import { db } from '@/config/firebase.config';
import { generateUsers } from '@/utils/generateRandomUsers';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { StyledRoot } from './styles';
import { HomeProps } from './types';

export default function Home({ ...rootProps }: HomeProps) {
	const theme = useTheme();
	const users = generateUsers(90) as [];

	return (
		<StyledRoot {...rootProps}>
			<ShortcutsSidebar />
			<HomeWall />
			<ContactsSidebar />
		</StyledRoot>
	);
}
