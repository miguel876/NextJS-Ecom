import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'pt'],

    // Used when no locale matches
    defaultLocale: 'en',
    localeDetection: false,

});

export const config = {
    // Match only internationalized pathnames
    matcher: [
        // This comes from the middleware basic setup
        "/",
        '/(pt|en)/:path*',
        // This comes from the section on matchers without prefix: https://next-intl-docs.vercel.app/docs/routing/middleware#matcher-no-prefix
        "/((?!api|_next|_vercel|.*\\..*).*)",
    ],
};