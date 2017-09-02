var path = require('path');


module.exports = {
  entry: path.resolve(__dirname, 'client/client.jsx'),
  output: {
    path: path.resolve(__dirname, 'public/javascripts'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
        test: /.jsx?$/, // 文件过滤规则
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'] // es2015 处理 ES6 语法，react 处理 jsx 语法
        }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  }
  ,
  externals: {
    "react": 'React',
    "react-dom": "ReactDOM"
  },
};