const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const DotenvPlugin = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dotenvPlugin = new DotenvPlugin({ path: path.resolve(__dirname, '.env')})

module.exports = {
  entry: {
    main: './src/index.tsx',
    store: './src/app/store/index.tsx'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static/images'
        }
      },
      {
        test: /\.(json)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static/public'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      templateParameters: (compilation, assets, assetTags, options) => {
        return {
          compilation,
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            tags: assetTags,
            files: assets,
            options
          },
          // env: Object.assign({}, ...Object.keys(dotenvPlugin.definitions).map(d =>
          //    ({[d.replace('process.env.', '')]: dotenvPlugin.definitions[d].replace(/\"/g, '')})
          // ))
        }
      },
      favicon: 'src/assets/images/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/bundle.css'
    }),
    dotenvPlugin,
    new WebpackNotifierPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[contenthash].bundle.js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  node: {
    global: false,
  },
}