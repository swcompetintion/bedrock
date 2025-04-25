// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production', // 또는 'production'
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // filename을 bundle.js로 변경하는 것이 일반적입니다.
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: true, // SPA에서 라우팅을 위해 필요할 수 있습니다.
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // 필요하다면 CSS/이미지 등을 위한 로더 규칙 추가
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    template: './public/index.html'
  })],
  // --- 이 부분을 추가/수정합니다 ---
  resolve: {
    extensions: ['.js', '.jsx', '.json'], // .jsx 확장자를 추가하여 Webpack이 찾아보도록 합니다.
  },
  // -----------------------------
};
