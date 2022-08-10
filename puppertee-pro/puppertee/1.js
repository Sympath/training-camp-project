let request = require("request");
let url = "https://juejin.cn/tag/%E5%89%8D%E7%AB%AF";
let fs = require("fs");
let regexp = /class="title" data-v-\w+>(.+?)<\/a>/g;

request(url, (err, response, body) => {
  let titles = [];
  body.replace(regexp, (matched, title) => {
    titles.push(title);
  });
  console.log(titles);
  fs.writeFileSync("titles.txt", titles);
});
