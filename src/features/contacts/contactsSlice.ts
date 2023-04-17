import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore';

export const firestoreApi = createApi({
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Score'],
	endpoints: (builder) => ({
		fetchHighScoresTables: builder.query<ScoresTables, void>({
			async queryFn() {
				try {
					const ref = collection(firestore, 'scoresTables');
					const querySnapshot = await getDocs(ref);
					const scoresTables: ScoresTables = [];
					querySnapshot?.forEach((doc) => {
						scoresTables.push({ id: doc.id, ...doc.data() } as ScoresTable);
					});
					return { data: scoresTables };
				} catch (error: any) {
					console.error(error.message);
					return { error: error.message };
				}
			},
			providesTags: ['Score'],
		}),
		setNewHighScore: builder.mutation({
			async queryFn({ scoresTableId, newHighScore }) {
				try {
					await updateDoc(doc(firestore, 'scoresTables', scoresTableId), {
						scores: arrayUnion(newHighScore),
					});
					return { data: null };
				} catch (error: any) {
					console.error(error.message);
					return { error: error.message };
				}
			},
			invalidatesTags: ['Score'],
		}),
	}),
});

export const { useFetchHighScoresTablesQuery, useSetNewHighScoreMutation } = firestoreApi;
