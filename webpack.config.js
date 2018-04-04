const path = require('path'); //Node 内置的 path 模块，并在它前面加上 __dirname这个全局变量
const HtmlWebpackPlugin = require('html-webpack-plugin');//生成动态html，不用手动引入js，将生成后的js自动注入到html中
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");//提取.vue文件中的css
const CleanWebpackPlugin = require('clean-webpack-plugin');

const appCss = new ExtractTextPlugin('css/app.css');
const vendorCss = new ExtractTextPlugin('css/vendor.css');

module.exports = {
    entry: {
        app: './src/main.js',
        vendor: ['vue']
    },

    output: {
        filename: '[name]-[hash].js',
        path: path.resolve(__dirname, 'dist') // 用path.resolve()处理，是为了确保路径是从根目录开始绝对定位到指定位置
    },

    // loader就是对模块源代码进行转换和预处理。
    module: {
        rules: [
            //将css引入js中
            {
                test: /\.css$/,
                use: vendorCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                }),
                exclude: /node_modules/
            },

            //file-loader 指定资源放置位置；url-loader: 有条件的将图片转变成base64
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name]_[hash:7].[ext]'
                    }
                }
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                options: {
                    loaders: {
                        css: appCss.extract({
                            use: [{
                                loader: 'css-loader'
                            }, {
                                loader: 'postcss-loader'    
                            }],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
        appCss,
        vendorCss
    ],

    // 解析
    resolve: {
        // 别名
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, 'src')
        },
        //自动解析扩展
        extensions: ['.js', '.json', '.vue', '.css']
    }
};

if (process.env.NODE_ENV === 'development') {
    module.exports.devServer = {
        historyApiFallback: true, // 任意的 404 响应都替代为 index.html
        hot: true, // 启用 webpack 的模块热替换特性
        inline: true // 启用内联模式
    };
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.HotModuleReplacementPlugin()
    ]);
} else if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new CleanWebpackPlugin(['dist'])
    ]);
}