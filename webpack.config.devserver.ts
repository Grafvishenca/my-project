import path = require('path');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin = require('copy-webpack-plugin');
import MiniCssExtractPlugin = require('mini-css-extract-plugin');
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import * as webpack from 'webpack';
import { Application, Request, Response } from 'express';

const config: webpack.Configuration = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[chunkhash].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    watchContentBase: true,
    open: true,
    compress: true,
    hot: false,
    inline: true,
    port: 8001,
    index: 'views/index.html',
    before: function(app: Application) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const bodyParser = require('body-parser');
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));

      app.post('/registration', function(req: Request, res: Response) {
        setTimeout(() => res.json({ 'form-data': req.body }), 10000);
      });
    }
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
        test: /\.html$/,
        loader: 'handlebars-loader',
        options: {
          runtime: path.join(__dirname, 'src/js/hbshelpers/index')
        }
      },

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
          to: 'img'
        }
      ]
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      scriptLoading: 'defer',
      template: path.resolve(__dirname, 'src/views/index.html'),
      filename: 'views/index.html',
      minify: false
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      scriptLoading: 'defer',
      template: path.resolve(__dirname, 'src/views/about.html'),
      filename: 'views/about.html',
      minify: false
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      scriptLoading: 'defer',
      template: path.resolve(__dirname, 'src/views/login.html'),
      filename: 'views/login.html',
      minify: false
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      scriptLoading: 'defer',
      template: path.resolve(__dirname, 'src/views/contact.html'),
      filename: 'views/contact.html',
      minify: false
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.[chunkhash].css'
    })
  ]
};

export default config;
