import {ItemModel} from './item';
import {UserModel} from '../../user/models/user';

export class RoomModel {
  name: string;
  id: number;
  owner: number;
  items: ItemModel[];
  users: UserModel[];
}
