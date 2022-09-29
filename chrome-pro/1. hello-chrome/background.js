/**
 * 点击浏览器图标绑定的事件
 * @param tab
 */
chrome.browserAction.onClicked.addListener(async (tab) => {
    alert(`hello chrome`)
});