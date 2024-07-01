import path = require('path');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin = require('copy-webpack-plugin');
import MiniCssExtractPlugin = require('mini-css-extract-plugin');
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import * as webpack from 'webpack';
import TransformToWebmasterLandingPlugin from './webpack/TransformToWebmasterLandingPlugin';

const config: webpack.Configuration = {
    stats: {
        children: true
    },
    target: 'node',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'js/bundle.[chunkhash].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [
            'node_modules',
            'src'
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.d\.ts$/,
                loader: 'ignore-loader'
            },

            {
                test: /\.(sass|scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },

            {
                test: /\.(png|jpg|gif|svg|webp)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name][ext][query]'
                }
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext][query]'
                }
            }
        ]
    },
    plugins: [
        new ESLintWebpackPlugin({
            extensions: ['ts', 'tsx'],
            exclude: ['node_modules']
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/img',
                    to: 'img',
                    noErrorOnMissing: true
                }
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'Landing Page',
            inject: 'body',
            scriptLoading: 'defer',
            template: path.resolve(__dirname, 'src/views/index.html'),
            filename: 'index.html',
            minify: false
        }),
        new TransformToWebmasterLandingPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.[chunkhash].css'
        })
    ]
};

export default config;
