const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
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
        // 配置 省略文件路径的后缀名。默认省略js和json。也是webpack默认认识的两种文件类型
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        // 告诉webpack解析模块是去找哪个目录，该配置明确告诉webpack，直接去上一层找node_modules。
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
        ], //压缩css
        runtimeChunk: 'single',
        splitChunks: {
            minSize: 30000,
            maxSize: 3000000,
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
            // {
            //   test: /\.js?$/,
            //   exclude: /node_modules/,
            //   use: ['cache-loader', 'babel-loader'], //'eslint-loader'
            // },
            // {
            // 	test: /\.pug$/,
            // 	use: ['html-loader', 'pug-html-loader'],
            // },
            // {
            //   test: /\.html$/,
            //   use: 'html-loader',
            // },
            // {
            // 	test: /\.scss$/,
            // 	exclude: /node_modules/,
            // 	use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            // },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            // Webpack4使用file-loader实现
            {
                test: /\.(eot|ttf|woff|woff2|svg)(\?.+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'resource/[name][hash:8][ext]', // [ext]前面自带"."
                },
            },
            // Webpack4使用url-loader实现
            {
                test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
                type: 'asset',
                generator: {
                    filename: 'images/[name][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, //超过10kb不转base64
                    },
                },
            },
        ],
    },
    plugins: [
        new ProgressBarPlugin({ format: `:msg [:bar] :percent time :elapsed s` }), // 进度条
        new BundleAnalyzerPlugin(), //打包体积可视化分析
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
        // new CopyWebpackPlugin({
        //   patterns: [
        //     { from: resolve(__dirname, 'public/sprites.png'), to: resolve(__dirname, 'dist') },
        //     { from: resolve(__dirname, 'public/brython.min.js'), to: resolve(__dirname, 'dist') },
        //   ],
        // }),
        new HotModuleReplacementPlugin(), //HMR
    ],
};
