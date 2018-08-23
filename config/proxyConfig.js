const apiHost = "http://fruits.vchuang.com.cn"

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