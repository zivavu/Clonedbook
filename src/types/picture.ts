import { Comment } from './comment';
import { Reaction } from './reaction';

export interface Picture {
	id: string;
	ownerID: string;
	pictureURL: string;
	reactions?: Reaction[];
	comments?: Comment[];
}
