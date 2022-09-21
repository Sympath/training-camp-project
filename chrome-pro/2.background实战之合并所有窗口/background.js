/** 实现将所有窗口等tab页合并到当前窗口
    1. 监听图标点击事件
    2. 获取当前窗口，作为目标窗口
    3. 要进行tab页的迁移，需要条件【被迁移tab页id / 指定目标窗口id / 指定目标索引（放在第几个位置）】，然后使用chrome.tabs.move实现迁移即可。
    3.1.被迁移tab页id：通过chrome.windows.getAll获取所有窗口，再通过窗口对象的tabs属性获取对应tab对象
    3.2 指定目标窗口id：通过chrome.windows.getCurrent获取目标窗口
    3.3 指定目标索引：起始位置是当前窗口的tab数；然后每次+1就是目标
 */

function promisify(cb) {
    return function (...params) {
        return new Promise((res, rej) => {
            cb(...params, function (result) {
                res(result)
            })
        })
    }
}
let funNames = [
    {
        chromeName: 'windows',
        funName: 'getCurrent'
    },
    {
        chromeName: 'windows',
        funName: 'getAll'
    },
    {
        chromeName: 'tabs',
        funName: 'getAllInWindow'
    }
]
funNames.forEach(({ chromeName, funName }) => {
    chrome[chromeName][funName] = promisify(chrome[chromeName][funName])
})

let targetWindow = null; //当前激活的浏览器窗口
let tabCount = 0; //当前激活浏览器窗口里的tab的数量
/**
 * 点击浏览器图标绑定的事件
 * @param tab
 */
chrome.browserAction.onClicked.addListener(async (tab) => {
    let targetWindow = await chrome.windows.getCurrent()
    let tabs = await chrome.tabs.getAllInWindow(targetWindow.id);
    tabCount = tabs.length;
    // 如果populate是true表示每个视窗对象都有一个包含该视窗所有标签的tabs属性。
    let windows = await chrome.windows.getAll({ "populate": true })
    var numWindows = windows.length;
    var tabPosition = tabCount;
    for (var i = 0; i < numWindows; i++) {
        var win = windows[i];
        if (targetWindow.id != win.id) {
            var numTabs = win.tabs.length;
            for (var j = 0; j < numTabs; j++) {
                var tab = win.tabs[j];
                chrome.tabs.move(tab.id, { "windowId": targetWindow.id, "index": tabPosition });
                tabPosition++;
            }
        }

    }
});