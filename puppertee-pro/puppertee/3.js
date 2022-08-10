const puppeteer = require("puppeteer");
(async function () {
  const browser = await puppeteer.launch({ headless: false }); //启动浏览器
  let page = await browser.newPage(); //创建一个 Page 实例
  await page.setJavaScriptEnabled(true); //启用javascript
  await page.goto("https://www.jd.com/");
  const searchInput = await page.$("#key"); //获取元素
  await searchInput.focus(); //定位到搜索框
  await page.keyboard.type("手机"); //输入手机
  const searchBtn = await page.$(".button");
  await searchBtn.click();
  page.waitForTimeout()
  await page.waitForSelector();
  page.waitForNetworkIdle();
  page.waitForXPath// 节点路径，无恒埋点
  await page.waitForSelector(".gl-item"); //等待元素加载之后，否则获取不了异步加载的元素
  const links = await page.$$eval(
    ".gl-item > .gl-i-wrap > .p-img > a",
    (links) => {
      return links.map((a) => {
        return {
          href: a.href.trim(),
          title: a.title,
        };
      });
    }
  );
  console.log(links);
})();