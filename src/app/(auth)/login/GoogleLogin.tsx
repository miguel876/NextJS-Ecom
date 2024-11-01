'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    signIn('google');
  };

  return (
    <Button size="sm" onClick={handleGoogleLogin} variant="outline">
      Sign in
    </Button>
  );
};

export default GoogleLogin;
