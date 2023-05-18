const merge = require('webpack-merge'); // 导入merge模块
const common = require('./webpack.base.js'); // 导入webpack.base.js模块
const path = require('path'); //导入path模块


module.exports = merge(common,{
  devtool: 'inline-source-map',
  devServer:{// 开发服务器
    contentBase:'../dist'
  },
  output:{
    filename:'js/[name].[hash].js',
    path:path.resolve(__dirname,'../dist')
  },
  module:{},
  mode: 'development',
});