export interface UserReaction {
  userId: string;
  type: PossibleReaction;
}

export type PossibleReaction = 'angry' | 'like' | 'love' | 'sad' | 'wow' | 'haha' | 'care';
