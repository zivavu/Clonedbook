import { Reaction } from './reaction';

export interface Comment {
	userID: string;
	commentText: string;
	commentResponses?: Comment[];
	reactions?: Reaction[];
}
