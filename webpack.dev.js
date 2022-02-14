const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    target: 'web',
    devServer: {
        https: true,
        contentBase: './dist',
        host: '0.0.0.0',
        port: 4001,
        compress: true,
        open: true, //自动打开浏览器
        historyApiFallback: true,
        hot: true, //hmr
    },
});
