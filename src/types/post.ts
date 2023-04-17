import { Reaction } from './reaction';

export interface Post {
	id: string;
	ownerID: string;
	postPictures?: string[];
	postText?: string;
	reactions?: Reaction[];
	comments?: Comment[];
}
