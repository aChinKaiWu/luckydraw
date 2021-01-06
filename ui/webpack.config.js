const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/landing.tsx',
  output: {
    path: path.join(__dirname, '/static/build/'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/typescript']
          }
        }
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    ]
  },
  devServer: {
    host: 'localhost',
    hot: true,
    writeToDisk: true
  },
  watchOptions: {
    poll: 1000
  },
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss'] },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}'
      }
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}
