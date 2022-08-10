let puppeteer = require("puppeteer");
(async () => {
  // 打开一个无界面的浏览器
  const browser = await puppeteer.launch({
    headless: false
  });
  // 打开一个空白页
  let page = await browser.newPage();
  // 在地址栏中输入百度的地址
  await page.goto("http://baidu.com");
  // 把当前页面进行截图 保存在baidu.png文件中
  await page.screenshot({
    path: "baidu.png",
  });
  await browser.close(); //关闭浏览器
})();