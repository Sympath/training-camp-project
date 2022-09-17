<<'COMMENT'
兼容js中的判断逻辑 即隐式类型转换 目前支持
1. 字符串0返回为true（对shell而言是数字0），非0返回false（对shell而言是数字1）
@case
hasGit=1 # 这里是默认的string类型 所以如果不用boolean包裹 还是会走进判断逻辑中
if boolean $hasGit; then
echo '包含git'
fi
@param  判断变量 目前支持String
@return 数字0或1（0为true，1为false）
COMMENT
function boolean () {
    local bool=1
    if [[ $1 == 0 ]]; then
        # source ../install/git/git.sh
        bool=0
    fi
    return $bool
}