const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name]_[hash:8].js",
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: "babel-loader",
            },
            {
                test: /.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /.less/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]_[hash:8].[ext]",
                        },
                    },
                ],
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            limit: 1024000,
                            options: {
                                name: "[name]_[hash:8][ext]",
                            },
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: false,
                removeComments: false,
            },
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name]_[contenthash:8].css",
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /.css$/g,
            cssProcessor: require("cssnano"),
        })
    ],
    devServer: {
        hot: true,
        contentBase: "./dist/",
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: true,//移除所有console相关代码；
                        drop_debugger: true,//移除自动断点功能；
                        pure_funcs: ["console.log", "console.error"],//配置移除指定的指令，如console.log,alert等
                    },
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            })
        ]
    }
};