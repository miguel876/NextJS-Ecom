"use client"

import Image from 'next/image'
import React from 'react'
import { Button } from '../button'
import { Props } from './banner.types'
import { useRouter  } from 'next/navigation'

export const Banner = ({ title, description, imgUrl, cta }: Props) => {
    const router = useRouter()

  return (
    <div className='relative w-screen h-96'>
        <Image 
          src={imgUrl} 
          alt="Banner Product Image" 
          layout='fill'
          objectFit='cover' 
        />
        <div className='bg-gradient-to-r dark:from-black from-white from-0% h-full w-full absolute top-0 left-0'></div>
        <div className='container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-5 flex-col items-start'>
          <h1 className='text-5xl'>{title}</h1>
          <div>{description}</div>
          { !!cta && <Button onClick={() => router.push(cta?.link)}>{cta?.title}</Button> }
        </div>
    </div>
  )
}
