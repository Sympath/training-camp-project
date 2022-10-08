const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

// Generate pages object
const pagesObj = {};

const chromeName = ["popup", "options"];

chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.js`,
    template: "public/index.html",
    filename: `${name}.html`
  };
});

let commonPlugins = [{
  from: path.resolve("public"),
  to: path.resolve("dist/assets")
}]
const plugins =
  process.env.NODE_ENV === "production"
    ? [
      {
        from: path.resolve("src/manifest.production.json"),
        to: `${path.resolve("dist")}/manifest.json`
      }
    ]
    : [
      {
        from: path.resolve("src/manifest.development.json"),
        to: `${path.resolve("dist")}/manifest.json`
      }
    ];
plugins.concat(commonPlugins)
module.exports = {
  pages: pagesObj,
  configureWebpack: {
    entry: {
      background: "./src/background/main.js",
      "contet-script": "./src/contet-script/main.js"
    },
    output: {
      filename: "js/[name].js"
    },
    plugins: [CopyWebpackPlugin(plugins)]
  }
};
