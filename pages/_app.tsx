import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global-styles';
import { theme } from '../styles/theme';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
