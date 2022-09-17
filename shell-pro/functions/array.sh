<<'COMMENT'
注意事项
1. 入参：不能向函数传递一个数组，而应该是遍历的数组的值，所以不能写=(${echo ${myarray[*]}))，这样相当于arg1是一个数组了；而是`func ${myarray[*]}`返回的则是1 2 3 4单个的输出值；
2. 出参：函数的返回同理，返回的是单个的数值，接受的时候加上(),组成数组
3. 静态方法：采用Array_形式
4. 属性：采用 prop_ 形式
5. 关于bash版本对数组传值的影响
    1. 在bash3.x版本中，我们可以${myarray[*]}传递数组的值进入然后在内部转为数组；（可以参考array.bash3.sh文件）
    2. 在bash5.x版本中，对数组的空格会认为是参数传值，从而引起错误；所以我们就可以采用eval配置数组名形式进行获取
COMMENT

# =========静态方法=========
function Array_form () {
    local arrName=$1
    local args=($*)
    unset $args[1]
    $arrName=$args
    function $arrName.length () {
        echo ${#arrName[@]}
    }
}
# =========属性=========
<<'COMMENT'
获取数组长度
@case toLengthResult=`prop_length ${arr[*]}`
# @param arr 数组名
@return  length
COMMENT
function prop_length () {
    local name=$1
    eval local innerArr=(\${${name}[@]})
    echo ${#innerArr[@]}
}

# =========实例方法=========
# 打印所有元素
# @param arr 数组
# @return 所有数组元素
<<'COMMENT'
@case toStringResult=`toString ${arr[*]}`
@param arr 数组名
@return 所有数组元素
COMMENT
function toString () {
    local name=$1
    eval local innerArr=(\${${name}[@]})
    echo ${innerArr[@]}
}

function arr_includes () {
    local name=$1
    eval local innerArr=(\${${name}[@]})
    local item=$2
    if [[ "${innerArr[@]}"  =~ "${item}" ]]; then
        echo 0
    else
        echo 1
    fi
}

<<'COMMENT'
追加元素
@param arr 数组名
@param item 被追加的元素
@return  改变后的数组字符串
COMMENT
function push() {
    # 获取数组名
    local name=$1
    # 获取数组内容，创造一个对应的内部数组
    eval local innerArr=(\${${name}[@]})
    local item=$2
    innerArr+=($item)
    # 先清除的尝试 失败
    # local length=${#innerArr[@]}
    # eval unset $name 
    # for((i=0;i<$length;i++)); do
    #     eval unset $name[$i]
    # done
    echo ${innerArr[@]}
}
# 通过下标索引删除一个元素
# @param arr 数组
# @param index 被删除元素的索引
# @return  改变后的数组字符串
function deleteByIndex () {
    # 获取数组名
    local name=$1
    # 获取数组内容，创造一个对应的内部数组
    eval local innerArr=(\${${name}[@]})
    local index=$2
    unset innerArr[$index]
    echo ${innerArr[@]}
}
<<'COMMENT'
数组截取 顾前不顾后
@param startIndex 起始索引
@param endIndex 结束索引
@return  变量名  变量含义
COMMENT
function slice () {
    # 获取数组名
    local name=$1
    # 获取数组内容，创造一个对应的内部数组
    eval local innerArr=(\${${name}[@]})
    local startIndex=$2
    local endIndex=$3
    echo ${innerArr[@]:$startIndex:$endIndex}
}

<<'COMMENT'
数组循环
@case  
    arr=(a b c)
    callback() {
        local item=$1
        local index=$2
        echo "${item}===${index}" ~/callback
    }
@param  这里参数名  这里参数含义
@return  变量名  例子
COMMENT
function forEach () {
    local name=$1
    eval local innerArr=(\${${name}[@]})
    local cb=$2;
    for(( i=0;i<${#innerArr[@]};i++)) do
        "${cb}" "${innerArr[i]}" ${i}
    done;
}

<<'COMMENT'
# 数组循环 暂时没想好怎么封装
for element in ${test[@]}
do
echo "This is $element..."
done
COMMENT