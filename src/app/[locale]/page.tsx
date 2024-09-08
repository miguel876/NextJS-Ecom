import Banner from '@/components/ui/banner';

export default function Home() {
  const bannerInfo = {
    title: 'Welcome to the MigStore',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, velit in egestas posuere, nibh ex varius orci, at venenatis ante orci non eros. Cras euismod, nisi quis vehicula efficitur, urna turpis finibus augue, sit amet hendrerit lorem urna ut lectus.',
    imgUrl: '/assets/images/plant-banner.png',
    cta: {
      title: 'Find More',
      link: '/products',
    },
  };

  return (
    <Banner {...bannerInfo} />
  );
}
