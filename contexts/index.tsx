import React, { createContext, useState } from 'react';
import { User } from '@/interfaces/models/user';
import { Context } from '@/interfaces/contexts';

export const AppContext = createContext<Context>({
  user: null,
  setUserInfo: () => null,
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

  return (
    <AppContext.Provider value={{ user, setUserInfo }}>
      {children}
    </AppContext.Provider>
  );
};

export default Store;
