const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const DotenvPlugin = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dotenvPlugin = new DotenvPlugin({ path: path.resolve(__dirname, '.env')})

module.exports = {
  entry: {
    main: './src/index.tsx'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
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
          env: Object.assign({}, ...Object.keys(dotenvPlugin.definitions).map(d =>
            ({[d.replace('process.env.', '')]: dotenvPlugin.definitions[d].replace(/\"/g, '')})
          ))
        }
      }
    }),
    dotenvPlugin,
    new WebpackNotifierPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  node: {
    fs: "empty"
 }
}
