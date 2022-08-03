import React from 'react';
import { AuthTemplates } from '@/components/templates';
import { SignUpComponent } from '@/components/templates';
import homeHOC from '@/hoc/homeHOC';

const SignUpPage = homeHOC(() => {
  return (
    <AuthTemplates>
      <SignUpComponent />
    </AuthTemplates>
  );
});

export default SignUpPage;
