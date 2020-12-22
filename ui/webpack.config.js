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
            presets: ['@babel/typescript', '@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    host: 'localhost',
    hot: true,
    open: true,
    writeToDisk: true
  },
  watchOptions: {
    poll: 1000
  },
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: './src/**/*'
      }
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}
