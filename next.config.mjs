import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: '*.public.blob.vercel-storage.com'
        },
        {
            protocol: 'https',
            hostname: '*.googleusercontent.com'
        }
        ]
    }
};

export default withNextIntl(nextConfig);
