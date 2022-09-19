let messageObj = googleApi.getMessageObj('popup')
// 在popup.html的页面里，Dom内容加载完毕后执行
document.addEventListener('DOMContentLoaded', function (event) {
    var resultsButton = document.getElementById('getResults');
    resultsButton.onclick = getResults;
});
// 当点击按钮时，获取当前活动Tab窗口，并发送消息到content_script
async function getResults() {
    let response = await messageObj.postMessage({ action: 'checkForContent' })
    debugger
    showResults(response.results);
}
// 获取从content_script的返回结果
function showResults(results) {
    var resultsElement = document.getElementById('results');
    resultsElement.innerText = results ?
        results :
        '没有收到content script的内容';
}
