'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { FaMoon, FaSun } from "react-icons/fa";

export const ThemeSwitch = () => {
    const {theme, setTheme} = useTheme()

  return (
    <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
    </Button>
  )
}