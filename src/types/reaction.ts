export interface IUserReaction {
  userId: string;
  type: TPossibleReaction;
}

export type TPossibleReaction = 'angry' | 'like' | 'love' | 'sad' | 'wow' | 'haha' | 'care';
