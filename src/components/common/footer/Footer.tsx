import Link from 'next/link';
import React from 'react';
import { CiInstagram, CiFacebook } from 'react-icons/ci';

const Footer = () => {
  return (
    <div className="py-4 container grid grid-cols-3 grid-rows-1">
      <div></div>
      <div className="flex gap-2 items-center justify-center">
        <Link href="/">
          <CiInstagram size={20} />
        </Link>
        <Link href="/">
          <CiFacebook size={20} />
        </Link>
      </div>
      <div className="flex justify-end items-center">
        <p className="text-xs">© 2024 MigStore. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
