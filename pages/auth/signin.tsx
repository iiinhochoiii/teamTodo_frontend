import React from 'react';
import { AuthTemplates, SignInComponent } from '@/components/templates';
import homeHOC from '@/hoc/homeHOC';

const SignInPage = homeHOC(() => {
  return (
    <AuthTemplates>
      <SignInComponent />
    </AuthTemplates>
  );
});

export default SignInPage;
