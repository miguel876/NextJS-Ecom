'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="link"
      size="sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Theme switch"
    >
      {theme === 'dark' ? <FaSun size={15} /> : <FaMoon size={15} />}
    </Button>
  );
};
