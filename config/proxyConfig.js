// const apiHost = "https://www.vue-js.com";
const apiHost = "http://bingjia.320.io"

module.exports = {
    proxy: {
        '/api': {
            target: apiHost,
            secure: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api':  ''
            }
        }
    }
}