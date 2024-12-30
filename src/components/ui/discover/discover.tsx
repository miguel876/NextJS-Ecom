import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export const Discover = async () => {
  const translate = await getTranslations('labels');
  return (
    <div className="container flex items-center mt-10 sm:mt-20 mb-3 md:mb-10 flex-col">
      <h1 className="text-3xl mb-4">{translate('discover')}</h1>
      <p>{translate('discoverText')}</p>
      <Link href="/products" className="underline my-5">
        {translate('viewProducts')}
      </Link>
    </div>
  );
};
