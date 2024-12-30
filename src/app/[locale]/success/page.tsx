import Link from 'next/link';
import React from 'react';

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Payment Successful!</h1>
      <p className="mt-4">Thank you for your purchase!</p>
      <p>Your order has been processed successfully.</p>
      <Link href="/" className="mt-6 underline">
        Return to Home
      </Link>
    </div>
  );
};

export default SuccessPage;
