const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[contenthash:8].js',
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        modules: [resolve(__dirname, './node_modules')],
    },
    cache: {
        type: 'filesystem',
        cacheDirectory: resolve(__dirname, '.temp_cache'),
        buildDependencies: {
            config: [__filename],
        },
    },
    performance: {
        hints: false,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserJSPlugin({}),
            new CssMinimizerPlugin({
                parallel: 2,
            }),
        ],
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/, //test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 10,
                    name: 'base',
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'async',
                    priority: 9,
                    minChunks: 2,
                    name: 'vendors',
                },
                styles: {
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                    priority: 20,
                    name: 'styles',
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    'cache-loader',
                    'babel-loader?cacheDirectory',
                    {
                        loader: 'ts-loader',
                        options: {
                            getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)(\?.+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'resource/[name].[hash:8][ext]',
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
                type: 'asset',
                generator: {
                    filename: 'images/[name][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            },
        ],
    },
    plugins: [
        new ProgressBarPlugin({ format: `:msg [:bar] :percent time :elapsed s` }),
        new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            favicon: './public/favicon.png',
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            ignoreOrder: true,
        }),
        new HotModuleReplacementPlugin(), //HMR
    ],
};
