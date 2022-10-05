import create from 'zustand';
import { User } from '@/interfaces/models/user';
import { removeToken } from '@/utils/token';

export interface UserState {
  user: User | null;
  setUserInfo: (user: User) => void;
  logout: () => void;
}

//기본 상태 선언
const defaultState = {
  user: null,
};

export const useUserStore = create<UserState>((set) => ({
  ...defaultState,
  setUserInfo: (value) => set(() => ({ user: value })),
  logout: () => {
    removeToken();
    return set(() => ({ user: null }));
  },
}));
