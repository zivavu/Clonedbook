import { IUser } from '@/types/user';
import { MutableRefObject } from 'react';

export interface PostTextInputProps {
  user: IUser;
  postPhotos: File[];
  postTextRef: MutableRefObject<string>;
}
