export const getProtocolHost = (): string => {
  let protocolHost = 'http://localhost:8080';

  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'development':
      protocolHost = 'http://localhost:8080';
      break;
    case 'production':
      protocolHost = 'https://todo-t4bt.onrender.com/';
      break;
  }

  return protocolHost;
};
