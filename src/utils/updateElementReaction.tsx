import { TElementTypes } from '@/types/misc';
import { TReactionType } from '@/types/reaction';
import { userPictureReact } from './userPictureReact';
import { userPostReact } from './userPostReact';

export interface IUpdateElementReaction {
  elementType: TElementTypes;
  loggedUserId: string;
  ownerId: string;
  elementId: string;
  reaction: TReactionType | null;
}

export default function updateElementReaction({
  elementType,
  loggedUserId,
  ownerId,
  elementId,
  reaction,
}: IUpdateElementReaction) {
  if (elementType === 'post') {
    userPostReact(elementId, loggedUserId, reaction);
  }
  if (elementType === 'accountPicture') {
    userPictureReact({ elementId, loggedUserId, ownerId, reaction, elementType });
  }
}
