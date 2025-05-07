const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/ToastMaster.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'toastmaster.min.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: '> 0.25%, not dead',
                useBuiltIns: 'usage',
                corejs: 3
              }]
            ]
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          },
          mangle: {
            reserved: ['Toast', 'ToastMaster', 'window', 'define', 'module']
          },
          output: {
            comments: false
          },
          keep_fnames: true
        },
        extractComments: false
      }),
    ],
  }
};