import { User } from '@/interfaces/models/user';

export interface Context {
  user: User | null;
  setUserInfo: (user: User) => void;
  logout: () => void;
}
