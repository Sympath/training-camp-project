const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    context: process.cwd(), // 上下文对象
    mode: "development",
    entry: {
        main: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: "babel-loader",
            },
            {
                test: /.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /.less/,
                use: ["style-loader", "css-loader", "less-loader"],
            },
            // {
            //   test: /.jpg|jpeg|gif|png$/,
            //   use: "file-loader",
            // },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 1024000,
                        },
                    },
                ],
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: "file-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
        }),
        new CleanWebpackPlugin(),
    ],
};
