'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    signIn('google');
  };

  return (
    <Button onClick={handleGoogleLogin} className="w-full uppercase">
      <Image
        src="/assets/images/google-brands-solid.svg"
        alt="Google Logo"
        width={13}
        height={13}
        className="mr-2"
      />
      Sign in with Google
    </Button>
  );
};

export default GoogleLogin;
