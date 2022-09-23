function typeCheck(type) {
    let types = [
        'Array',
        'Object',
        'Number',
        'String',
        'Undefined',
        'Boolean',
        'Function',
        'Map'
    ];
    let map = {};
    types.forEach(type => {
        map[type] = function (target) {
            return Object.prototype.toString.call(target) == `[object ${type}]`;
        }
    })
    return map[type]
}
function creatDom(domOpts, parentSelector) {
    let { tag, text, opts = {}, data = {}, children = [] } = domOpts;
    if (Object.keys(opts).length === 0) {
        opts = data
    }
    //创建一个div
    var dom = document.createElement(tag);
    if (text) {
        dom.innerHTML = text; //设置显示的数据，可以是标签．
    }

    for (const key in opts) {
        if (key === 'style' && typeCheck('Object')(opts[key])) {
            let styleOpts = opts[key];
            for (const styleKey in styleOpts) {
                dom.style[styleKey] = styleOpts[styleKey]
            }
        }
        if (key === 'style' && typeCheck('String')(opts[key])) {
            dom[key] = opts[key]
        }
        if (key === 'class') {
            dom.className = opts[key];
        }
        if (key === 'props') {
            let propOpts = opts[key];
            for (const propKey in propOpts) {
                dom[propKey] = propOpts[propKey]
            }
        }

        if (key === 'attrs') {
            let propOpts = opts[key];
            for (const propKey in propOpts) {
                dom[propKey] = propOpts[propKey]
            }
        }
        if (key === 'on') {
            let eventOpts = opts[key];
            for (const eventKey in eventOpts) {
                let fn = eventOpts[eventKey]
                dom.addEventListener(eventKey, fn)
            }
        }
    }
    children.forEach(child => {
        return dom.appendChild(creatDom(child));
    });
    if (parentSelector) {
        el = typeCheck('String')(parentSelector) ? document.querySelector(parentSelector) : el;
        el.appendChild(dom);
    }
    return dom;
}
function httpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}


document.querySelector('#start').addEventListener('click', () => {
    let wd = encodeURIComponent(document.querySelector('#keyword').value)
    let searchUrl = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=37155,36548,37115,37357,36885,37403,37404,36789,37259,26350,37344,37371&wd=${wd}&req=2&bs=%E7%8E%8B%E5%BF%97%E8%BF%9C&pbs=%E7%8E%8B%E5%BF%97%E8%BF%9C&csor=2&pwd=%E7%8E%8B%E5%BF%97%E8%BF%9C&cb=callback&_=1663922576575`
    // 这个函数的名称不能修改 原因是百度搜索结果采用jsonp接收
    function callback(searchResult) {
        let liDomOpts = searchResult.g.map(g => {
            let { q } = g;
            return {
                type: 'li',
                text: q
            }
        })
        let domOpts = {
            tag: 'ul',
            children: liDomOpts
        }
        creatDom(domOpts, '#resultDiv')
    }
    httpRequest(searchUrl, function (result) {
        debugger
        // 这里触发会导致错误，所以需要在manifest.json中配置内容协议【"content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'"】
        eval(result)
        // document.getElementById('resultDiv').innerText = result;
    })
})