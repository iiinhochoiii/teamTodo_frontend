import { User } from '@/interfaces/models/user';

export interface Context {
  user: User;
  setUserInfo: (user: User) => void;
}
