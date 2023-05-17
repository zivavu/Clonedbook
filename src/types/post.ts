import { IWallElement } from './misc';

export interface IPost extends IWallElement {
  text?: string;
  pictures?: string[];
}

export interface IPostsMap {
  [key: string]: IPost;
}
