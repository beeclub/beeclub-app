const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

console.log(CleanWebpackPlugin);

const htmlParameter = function(name, title, root, chunks) {
  var filename = root ? name + ".html" : "pages/" + name + ".html";
  // var chunks = chunks || [];
  // const v = Array.prototype.push.call(chunks,);
  // console.log(chunks);
  return {
    template: "./src/templates/" + name + ".html",
    filename: filename,
    favicon: "./favicon.ico",
    title: title,
    //inject: true,
    hash: true,
    chunks: ["base", name].concat(chunks || [])
    // meta:{test:11}
    // chunksSortMode: 'dependency'

    // chunksSortMode:'dependency',
    // excludeChunks: ['common',name]
  };
};

const config = {
  mode: "development", //production
  entry: {
    // "swiper": ["./src/lib/swiper/js/swiper.min.js"],
    // 'vue': ['./src/plugins/vue.js'],
    base: ["./src/lib/baiduTemplate.js", "./src/pages/common/base.js"],
    index: ["./src/pages/index/index.js"],
    "course/list": ["./src/pages/module/course/list.js"],
    "course/detail": ["./src/pages/module/course/detail.js"],
    "sem/pay/confirm":["./src/pages/sem/pay/confirm.js"]
    // "route/index": ["./src/pages/route/index.js"],
    // "articles/index": ["./src/pages/course/list/index.js"],
    // "bbs/index": ["./src/pages/bbs/index.js"],
    // "notes/index": ["./src/pages/notes/index.js"],
    // "lecturer/index": ["./src/pages/lecturer/index.js"],
    // "user/index": ["./src/pages/user/index.js"]
  },
  output: {
    publicPath: "/", //'http://127.0.0.1:8002/',
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js"
  },
  devtool: "inline-source-map",
  devServer: {
    port: 8002,
    host: "127.0.0.1",
    overlay: {
      errors: true
    }
    // contentBase: './dist'
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "window.baidu.template": "bdTpl",
      Vue: "Vue",
      Popper: ["popper.js", "default"]
    }),
    new ExtractTextWebpackPlugin({
      // 在plugins中配置属性
      filename: "css/[name].min.css", // 配置提取出来的css名称
      allChunks: true // true表示会把所有的css都提取出来，false只会把初始化的提取，默认是false
    }),
    new CleanWebpackPlugin({
      dry: true,
      verbose: true,
      cleanStaleWebpackAssets: false,
      protectWebpackAssets: false,
      //cleanOnceBeforeBuildPatterns: ['**/*', '!static-files*'],
      //cleanOnceBeforeBuildPatterns: [], // disables cleanOnceBeforeBuildPatterns

      // Removes files after every build (including watch mode) that match this pattern.
      // Used for files that are not created directly by Webpack.
      //
      // Use !negative patterns to exclude files
      //
      // default: disabled
      cleanAfterEveryBuildPatterns: ["dist*.*"],

      // Allow clean patterns outside of process.cwd()
      //
      // requires dry option to be explicitly set
      //
      // default: false
      dangerouslyAllowCleanPatternsOutsideProject: true,
      dry: true
    }),
    new HtmlWebpackPlugin(htmlParameter("index", "小蜜蜂课堂", true, [])),
    // new HtmlWebpackPlugin(htmlParameter("login", "小蜜蜂课堂-登录", true, [])),
    // new HtmlWebpackPlugin(
    //   htmlParameter("register", "小蜜蜂课堂-注册", true, [])
    // ),
    new HtmlWebpackPlugin(
      htmlParameter("course/list", "小蜜蜂课堂-查看课程", true, [])
    ),
    new HtmlWebpackPlugin(
      htmlParameter("course/detail", "小蜜蜂课堂-查看课程", true, [])
    ),
    new HtmlWebpackPlugin(
      htmlParameter("live/index", "小蜜蜂课堂-直播", true, [])
    ),
    new HtmlWebpackPlugin(
      htmlParameter("column/index", "小蜜蜂课堂-专栏", true, [])
    ),
    new HtmlWebpackPlugin(
      htmlParameter("mall/index", "小蜜蜂课堂-社区", true, [])
    ),
    new HtmlWebpackPlugin(
      htmlParameter("sem/pay/confirm", "小蜜蜂课堂-确认订单", true, [])
    )
    // new HtmlWebpackPlugin(
    //   htmlParameter("notes/index", "小蜜蜂课堂-战地笔记", true, [])
    // ),
    // new HtmlWebpackPlugin(
    //   htmlParameter("lecturer/index", "小蜜蜂课堂-讲师首页", true, [])
    // ),
    // new HtmlWebpackPlugin(
    //   htmlParameter("user/index", "小蜜蜂课堂-用户中心", true, [])
    // )
  ],
  resolve: {
    alias: {
      node_modules: __dirname + "/node_modules",
      util: __dirname + "/src/util",
      pages: __dirname + "/src/pages",
      service: __dirname + "/src/service",
      image: __dirname + "/src/image",
      plugins: __dirname + "/src/plugins",
      images: __dirname + "/src/images",
      lib: __dirname + "/src/lib",
      templates: __dirname + "/src/templates",
      mock: __dirname + "/src/mock"
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          // 使用ExtractTextWebpackPlugin的extract方法
          fallback: {
            // 这里表示不提取的时候，使用什么样的配置来处理css
            loader: "style-loader",
            options: {
              singleton: true // 表示将页面上的所有css都放到一个style标签内
            }
          },
          use: [
            // 提取的时候，继续用下面的方式处理
            {
              loader: "css-loader",
              options: {
                // minimize: true  // 开启压缩
              }
            }
          ]
        })
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]?[hash:8]",
              // publicPath: '../font',
              outputPath: "font/"
            }
          }
          // ,{
          // 	loader: 'url-loader'
          // }
        ]
      },
      {
        test: /\.(jpg|png|ico|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]?[hash:8]",
              // publicPath: '../images',
              outputPath: "images/"
            }
          }
        ]
      },
      // {
      // 	test: /\.(eot|svg|ttf|woff)$/,
      // 	use: [
      // 		{
      // 			loader: 'file-loader',
      // 			options: {
      // 				name: '[name].[ext]',
      // 				// publicPath: '../fonts/',
      // 				outputPath: 'fonts/'
      // 			}
      // 		}
      // 	]
      // },
      {
        test: /\.less$/,
        use: [{ loader: "less-loader" }] // compiles Less to CSS
      },
      {
        test: /\.tpl\.html$/,
        use: [{ loader: "html-loader", options: { interpolate: true } }]
      },
      {
        test: /\.string$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
              interpolate: true,
              removeAttributeQuotes: false
            }
          }
        ]
      }
      // ,
      // {
      //     test: /\.(html)$/,
      //     use: {
      //         loader: 'html-loader',
      //         options: {
      //             attrs: ['img:src', 'img:data-src', 'audio:src'],
      //             minimize: true
      //         }
      //     }
      // }
    ]
  }
};
// console.log(config)

module.exports = config;
