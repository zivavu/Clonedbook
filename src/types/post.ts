import { IWallElement } from './misc';
import { IPictureWithPlaceholders } from './picture';

export interface IPost extends IWallElement {
  text?: string;
  pictures?: IPictureWithPlaceholders[];
}

export interface IPostsMap {
  [key: string]: IPost;
}
