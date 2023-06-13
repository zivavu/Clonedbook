import { IWallElement } from './misc';
import { IPictureWithPlaceholders } from './picture';

export interface IPost extends IWallElement {
  pictures?: IPictureWithPlaceholders[];
}

export interface IPostsMap {
  [key: string]: IPost;
}
