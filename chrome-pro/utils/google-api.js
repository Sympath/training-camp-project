let communication = {
    postMessage(info) {
        return new Promise((res, rej) => {
            chrome.runtime.sendMessage(info, function (response) {
                res(response)
            });
        })
    },
    onmessage() {
        return new Promise((res, rej) => {
            chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                res({ request, sender, sendResponse })
            });
        })
    }
}
function getCommunication(key) {
    let communicationMap = {
        "popup-content": {
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
            onmessage() {
                return new Promise((res, rej) => {
                    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                        res({ request, sender, sendResponse })
                    });
                })
            }
        }
    }
    return communicationMap[key]
}