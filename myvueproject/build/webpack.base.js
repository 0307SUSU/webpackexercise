const webpack = require('webpack'); // 引入webpack模块
const path = require("path"); // 引入path模块
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
module.exports = {
  entry: './src/index.js', // 入口
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loder'
      },
      // 处理样式
      {
        test: /\.(sa|sc|c)ss$/,
        use:[
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      // 处理图片
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 5000,
              // 分离图片至imgs文件夹
              name: "imgs/[name].[ext]",
            }
          },
        ]
      },
      // 加快编译速度
      {
        test: /\.js$/,
        //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
        loader: 'happypack/loader?id=happyBabel',
        //排除node_modules 目录下的文件
        exclude: /node_modules/
      },    
    ]
  },
  plugins:[
    new VueLoaderPlugin(),
    // new webpack.HasedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'../index.html'),
    }),
    new HappyPack({
      //用id来标识 happypack处理类文件
      id: "happyBabel",
      //如何处理 用法和loader 的配置一样
      loaders: [
        {
          loader: "babel-loader?cacheDirectory=true"
        }
      ],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true
    }),
  ] // 插件
};
