import path = require('path');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin = require('copy-webpack-plugin');
import MiniCssExtractPlugin = require('mini-css-extract-plugin');
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
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
        test: /\.(png|jpg|gif|svg)$/i,
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
      filename: path.resolve(__dirname, 'dist/index.html'),
      minify: false
    }),
    new HtmlWebpackPlugin({
      title: 'About Page',
      inject: 'body',
      scriptLoading: 'defer',
      template: path.resolve(__dirname, 'src/views/about.html'),
      filename: path.resolve(__dirname, 'dist/about.html'),
      minify: false
    }),
    new HtmlWebpackPlugin({
      title: 'Login Page',
      inject: 'body',
      scriptLoading: 'defer',
      template: path.resolve(__dirname, 'src/views/login.html'),
      filename: path.resolve(__dirname, 'dist/login.html'),
      minify: false
    }),
    new HtmlWebpackPlugin({
      title: 'Login Page',
      inject: 'body',
      scriptLoading: 'defer',
      template: path.resolve(__dirname, 'src/views/contact.html'),
      filename: path.resolve(__dirname, 'dist/contact.html'),
      minify: false
    }),
    new MiniCssExtractPlugin({
      filename: 'css/bundle.[chunkhash].css'
    })
  ]
};

export default config;
