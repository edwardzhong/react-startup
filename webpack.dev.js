const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'web',
    devServer: {
        contentBase: './dist',
        port: 4001,
        compress: true,
        open: true,
        historyApiFallback: false,
        hot: true,
    },
});
