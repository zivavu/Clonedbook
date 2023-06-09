import { IWallElement } from './misc';
import { IPictureUrls } from './picture';

export interface IPost extends IWallElement {
  text?: string;
  pictures?: IPictureUrls[];
}

export interface IPostsMap {
  [key: string]: IPost;
}
