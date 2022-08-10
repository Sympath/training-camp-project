const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];

    const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));
    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index];
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        const pageName = match && match[1];
        entry[pageName] = entryFile;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `src/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: ["vendors", pageName], // 指定使用哪些chunks
                inject: true, //自动将所有chunks注入到模板文件中来 默认是true
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: false,
                    removeComments: false,
                },
            })
        );
    });
    return {
        entry,
        htmlWebpackPlugins,
    };
};
const { entry, htmlWebpackPlugins } = setMPA();
module.exports = {
    context: process.cwd(), // 上下文对象
    mode: "development",
    entry,
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
        ],
    },
    plugins: [new CleanWebpackPlugin()].concat(htmlWebpackPlugins),
};

