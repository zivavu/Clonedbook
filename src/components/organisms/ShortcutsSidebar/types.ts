import { StaticImageData } from 'next/image';

export interface Shortcut {
  key: string;
  IconImage?: StaticImageData;
  href: string;
  active: boolean;
}
