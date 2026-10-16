import React, { Suspense } from 'react';
import { AuthTemplates, SignInComponent } from '@/components/templates';

const SignInPage = () => {
  return (
    <AuthTemplates>
      {/* 로그인 후 ?redirect= 처리에 useSearchParams 를 사용하므로 Suspense 필요 */}
      <Suspense>
        <SignInComponent />
      </Suspense>
    </AuthTemplates>
  );
};

export default SignInPage;
