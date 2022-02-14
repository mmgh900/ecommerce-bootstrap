// next.config.js
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const production = process.env.NODE_ENV === 'production'
module.exports = withPWA({
    pwa: {
        dest: 'public',
        disable: !production,
        runtimeCaching,
    },
    images: {
        domains: ['newsmedia.tasnimnews.com', 'picsum.photos'],
    }
})
/*
module.exports = {
    images: {
        domains: ['newsmedia.tasnimnews.com'],
    }
}
*/
