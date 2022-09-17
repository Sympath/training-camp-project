<<'COMMENT'
类型判断：支持函数、整数
@case  resultFunctionA=`typeCheck Function functionA`  判断变量functionA是不是函数类型
@param 判断类型 Function Number
# @return 0 正确 | 1 错误
COMMENT
function typeCheck () {
    local type=$1;
    local vari=$2;
    local isTrue=1;
    if [[ $type == 'Function' ]]; then
        if [ `type -t $vari` == function ]; then
            isTrue=0
        fi
    elif [[ $type == 'Number' ]]; then
        if [ -n "$vari" -a "$vari" = "${vari//[^0-9]/}" ];then 
            isTrue=0
        fi
    fi
    # elif [[ $type == 'Array' ]]; then
    #     if [[ "${arr[*]}" =~ ${vari} ]];then 
    #         isTrue=0
    #     fi
    # fi
    echo $isTrue
}

