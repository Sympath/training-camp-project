chrome.contextMenus.create({
    'type': 'normal',
    'title': '使用百度翻译……',
    'contexts': ['selection'],
    'id': 'cn',
    'onclick': translate
});

function translate(info, tab) {
    var url = `https://fanyi.baidu.com/translate?aldtype=16047&query=${info.selectionText}#zh/en/${info.selectionText}`;
    window.open(url, '_blank');
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    chrome.contextMenus.update('cn', {
        'title': '使用百度翻译“' + message + '”'
    });
});
