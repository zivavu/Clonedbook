import { IPicturesMap } from './picture';
import { IUser } from './user';

export interface IUserServerData {
  data: IUser;
  pictures: IPicturesMap;
}
