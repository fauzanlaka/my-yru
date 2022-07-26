module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? '/demoyru/' : '/',
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    configureWebpack: {
        devtool: 'source-map'
    },
    // devServer: {
    //     host: 'yru-example.site'
    // }
}