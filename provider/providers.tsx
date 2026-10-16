'use client';

import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { GlobalStyle } from '@/styles/global-styles';
import { theme } from '@/styles/theme';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 기본값(0)이면 페이지 이동으로 컴포넌트가 다시 마운트될 때마다 재조회됨.
            // 데이터 변경은 각 mutation 의 invalidateQueries 로 즉시 반영됨
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
