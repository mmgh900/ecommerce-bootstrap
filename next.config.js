// next.config.js
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const production = process.env.NODE_ENV === 'production'
module.exports = {
    images: {
        domains: ['newsmedia.tasnimnews.com', 'picsum.photos'],
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
}
