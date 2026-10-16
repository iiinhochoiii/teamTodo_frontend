import React, { Suspense } from 'react';
import { AuthTemplates, SignUpComponent } from '@/components/templates';

const SignUpPage = () => {
  return (
    <AuthTemplates>
      {/* useUserMutation 이 useSearchParams 를 사용하므로 Suspense 필요 */}
      <Suspense>
        <SignUpComponent />
      </Suspense>
    </AuthTemplates>
  );
};

export default SignUpPage;
