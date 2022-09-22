import React, { createContext, useState } from 'react';
import { User } from '@/interfaces/models/user';
import { Context } from '@/interfaces/contexts';
import { removeToken } from '@/utils/token';

export const AppContext = createContext<Context>({
  user: null,
  setUserInfo: () => null,
  logout: () => null,
});

interface Props {
  children: React.ReactNode;
}

const Store = (props: Props) => {
  const { children } = props;
  const [user, setUser] = useState<User | null>(null);

  const setUserInfo = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ user, setUserInfo, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export default Store;
