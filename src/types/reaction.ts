export interface Reaction {
  reaction: 'angry' | 'like' | 'love' | 'sad' | 'wow' | 'haha';
  userId: string;
}

export interface UserReaction extends Reaction {
  itemId: string; // id of the post/comment/picture
}
