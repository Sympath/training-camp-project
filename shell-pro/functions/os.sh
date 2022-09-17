<<'COMMENT'
!/bin/bash
获取当前系统类型
@case platForm=$(getPlatForm) 获取当前的系统类型
@return  mac|win|linux
COMMENT
function getPlatForm() {
    local innerPlatForm
    if [[ $(uname) == 'Darwin' ]]; then
        innerPlatForm=mac
    fi
    if [[ $(uname) == 'Linux' ]]; then
        innerPlatForm=linux
    fi
    if [[ $(uname) == 'win32' ]]; then
        innerPlatForm=window
    fi
    # shell 的 function 只能返回整数值，所以如果想接收字符串类型 echo+$()方式获取
    echo $innerPlatForm
}
