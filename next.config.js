// next.config.js
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

/*module.exports = withPWA({
    pwa: {
        dest: 'public',
        runtimeCaching,
    },
    images: {
        domains: ['newsmedia.tasnimnews.com'],
    }
})*/
module.exports = {
    images: {
        domains: ['newsmedia.tasnimnews.com'],
    }
}
