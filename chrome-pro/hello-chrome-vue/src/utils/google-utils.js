/** 获取通信对象
 * 
 * @param {*} key popup ｜ content-script ｜ background 当前发起者类型
 * @param {*} contentType 默认短链接 ｜ long（长连接）｜ external（接受指定页面发送的消息）
 * @returns 
 */
function getMessageObj(key, contentType) {
    let postMessageKey = 'postMessage'
    let onmessage = () => {
        return new Promise((res, rej) => {
            chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                res({ request, sender, sendResponse })
            });
        })
    }
    if (contentType === 'long') {
        onmessage = (connectName) => {
            chrome.runtime.onConnect.addListener(function (port) {
                if (connectName === port.name) {
                    port.onMessage.addListener(function (msg) {
                        port.postMessage(`我收到啦，${msg}`)
                    })
                }
            })
        }
        postMessageKey = 'longPostMessage'
    }
    if (contentType === 'external') {
        onmessage = () => {
            chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
                res({ request, sender, sendResponse })
            });
        }
        postMessageKey = 'longPostMessage'
    }
    let postMessageMap = {
        "popup": {
            postMessage(info) {
                return new Promise((res, rej) => {
                    chrome.tabs.query(
                        { active: true, currentWindow: true },
                        function (tabs) {
                            chrome.tabs.sendMessage(
                                tabs[0].id,
                                info,
                                function (response) {
                                    if (response) {
                                        res(response.results);
                                    } else {
                                        rej()
                                    }
                                }
                            );
                        }
                    );
                })
            },
            longPostMessage(connectName) {
                chrome.tabs.query(
                    { active: true, currentWindow: true },
                    function (tabs) {
                        chrome.tabs.connect(
                            tabs[0].id,
                            info
                        );
                    }
                );
            }
        },
        "content-script": {
            postMessage() {

            },
            longPostMessage(connectName, info) {
                var port = chrome.runtime.connect({ name: connectName });
                port.postMessage(info)
                return new Promise((res, rej) => {
                    port.onMessage.addListener(function (response) {
                        if (response) {
                            res(response.results);
                        } else {
                            rej()
                        }
                    })
                })
            }
        }
    }
    return {
        postMessage: postMessageMap[key][postMessageKey],
        onmessage
    }
}

export default {
    getMessageObj
}