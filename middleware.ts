import { NextRequest, NextResponse } from 'next/server';

const TOKEN_NAME = 'x-token';

// 기존 authHOC / homeHOC 의 getInitialProps 리다이렉트를 대체
export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const hasToken = request.cookies.has(TOKEN_NAME);

  if (pathname.startsWith('/dashboard') && !hasToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if ((pathname === '/' || pathname.startsWith('/auth')) && hasToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/', '/auth/:path*', '/dashboard/:path*'],
};
