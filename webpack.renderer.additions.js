var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [new HtmlWebpackPlugin({
    template: './src/renderer/index.html'
  })]
};
