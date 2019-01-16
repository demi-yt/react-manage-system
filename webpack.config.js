const path = require('path');
const webpack = require('webpack');
// 打包html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 它会将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // webpack 入口
    entry: './src/app.jsx',  
    // webpack 出口
    output: {   
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'js/app.js'
    },
    module: {
        rules: [
            // react 语法处理
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','react']  // env自动根据环境来打包
                    }
                }
            },
            // css 文件处理
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            // sass 文件处理(sass-loader依赖node-sass和webpack)
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
                })
            },
            // url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。
            // 图片处理(url-loader依赖file-loader)
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                {
                    loader: 'url-loader',
                    options: {
                        // 文件大于8k处理
                        limit: 8192,
                        name: 'resource/[name].[ext]'
                    }
                }
                ]
            },
            // 字体加载处理
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 处理html文件
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
         // 上传css文件的位置(独立css文件)
        new ExtractTextPlugin("css/[name].css"), 
        // 提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename: 'js/base.js'
        })
    ],
    devServer:{
        port: 8086,
        // 找不到返回指定的页面
        historyApiFallback:{
            index: '/dist/index.html'
        },
        proxy : {
            '/manage' : {
                target: 'http://admintest.happymmall.com',
                changeOrigin : true
            },
            '/user/logout.do' : {
                target: 'http://admintest.happymmall.com',
                changeOrigin : true
            }
        }
    }
    
};