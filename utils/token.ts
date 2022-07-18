import Cookies from 'js-cookie';
import dayjs from 'dayjs';

const tokenName = 'x-token';

export const getToken = () => {
  return Cookies.get(tokenName);
};

export const setToken = (token: string) => {
  const expires = dayjs().add(8, 'hour').toDate();
  return Cookies.set(tokenName, token, {
    sameSite: 'None',
    secure: true,
    expires,
  });
};

export const removeToken = () => {
  return Cookies.remove(tokenName);
};
