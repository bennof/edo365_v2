const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
      'jsdox': ['./src/index.js'],
      'style': ['./src/style.js'],
      //'JSDoX': ['./node_modules/jsdox/src/index.js'],
      
    },
    output: {
      library: '[name]',
      libraryTarget: 'umd',
      filename: '[name].js',
      path: path.resolve(__dirname, '../static/js'),
    },
    module: { 
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true,
              },
            },
            // Translates CSS into CommonJS
            {
              loader: 'css-loader',
              options: {
                  importLoaders: 2,
                  sourceMap: true
              }
            },
            // Compiles Sass to CSS
            {
              loader: 'sass-loader', 
              options: {
                sourceMap: true,
              }
            },
          ],
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '../css/[name].css',
        chunkFilename: '../css/[id].css',
      })
    ]
  };
