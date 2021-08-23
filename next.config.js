// next.config.js
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = {
    pwa: {
        dest: 'public',
        runtimeCaching,
    },
    images: {
        domains: ['newsmedia.tasnimnews.com'],
    }
}