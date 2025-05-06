import { IWallElement } from './misc';
import { IPictureWithPlaceholders } from './picture';

export type TEmbedType = 'spotify' | 'youtube' | 'soundcloud';

export interface IEmbedLink {
  type: TEmbedType;
  url: string;
}

export interface IDrawing {
  // This could be a URL to an image, SVG data, or a custom drawing object
  dataUrl: string;
  description?: string;
}

export interface IPostIcon {
  name: string; // e.g., 'music', 'video', 'art', etc.
  color?: string;
}

export interface IPost extends IWallElement {
  pictures?: IPictureWithPlaceholders[];
  embeds?: IEmbedLink[]; // Spotify, YouTube, SoundCloud
  drawing?: IDrawing;    // Optional drawing
  icons?: IPostIcon[];   // Optional icons for the post
}

export interface IPostsMap {
  [key: string]: IPost;
}
