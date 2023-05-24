import { IUser } from '@/types/user';
import { StackProps } from '@mui/material';

export interface AboutTileProps extends StackProps {
  profileData: IUser;
}

export type TAboutTileSections =
  | 'overview'
  | 'work and education'
  | 'places lived'
  | 'family and relationships'
  | 'contact and basic info';

export interface SectionProps extends StackProps {
  profileData: IUser;
}
