'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    signIn('google');
  };

  return <Button onClick={handleGoogleLogin}>Sign in with Google</Button>;
};

export default GoogleLogin;
