var path = require('path')
  , fs = require('fs')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')

var jsLoader = [
  {
    loader: 'babel-loader',
    options: {
      ...JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.babelrc'))),
    },
  }
]

process.env.NODE_ENV === 'production' && jsLoader.push('eslint-loader')

module.exports = {
  module: {
    //加载器配置
    rules: [
      { 
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract([
          'css-loader',
          'sass-loader'
        ])
      }, {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
          /dist/
        ],
        use: jsLoader
      }, {
        test: /\.(png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100,
              name: './assets/[name].[ext]',
            }
          }
        ]
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20000,
              name: 'assets/[name].[ext]',
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    alias: {
      'react': path.join(__dirname, '../node_modules', 'react'),
      'scssinc': path.join(__dirname, '../src/assets/scss/_inc.scss')
    },
    extensions: ['.js', '.jsx']
  }
}