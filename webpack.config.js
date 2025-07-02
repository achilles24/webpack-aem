const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[contenthash].js',
        clean: true,
        publicPath: '/etc.clientlibs/webpack-project/clientlibs/webpack-project.main/'
    },
    optimization: {
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                compress: {
                    drop_console: true,
                    dead_code: true
                }
            }
        })],
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: 5,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    enforce: true,
                    priority: 10
                },
                html2pdf: {
                    test: /[\\/]node_modules[\\/]html2pdf\.js/,
                    name: 'html2pdf',
                    chunks: 'all',
                    priority: 20
                },
                parallax: {
                    test: /[\\/]node_modules[\\/]simple-parallax-js[\\/]/,
                    name: 'parallax',
                    chunks: 'all',
                    priority: 20,
                    enforce: true
                }
            }
        }
    },
    devServer: {
        static: './dist',
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};