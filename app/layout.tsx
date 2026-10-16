import React from 'react';
import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import StyledComponentsRegistry from '@/provider/registry';
import Providers from '@/provider/providers';
import '@/styles/font.css';

const DESCRIPTION =
  'TeamTodo는 실시간으로 어떤 업무를 진행하는지 공유를 하여 더욱 효율적으로 협업을 할 수 있도록 도와줍니다.';

export const metadata: Metadata = {
  metadataBase: new URL('https://todo.iiinho.me'),
  title: {
    default: 'Team Todo',
    template: '%s | TeamTodo',
  },
  description: DESCRIPTION,
  openGraph: {
    title: 'Team Todo',
    description: DESCRIPTION,
    type: 'website',
    url: '/',
    images: ['/images/set-teams.png'],
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <AppRouterCacheProvider>
            <Providers>{children}</Providers>
          </AppRouterCacheProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
