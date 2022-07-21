module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/demoyru/' : '/',
    configureWebpack: {
        devtool: 'source-map'
    },
    // devServer: {
    //     host: 'yru-example.site'
    // }
}