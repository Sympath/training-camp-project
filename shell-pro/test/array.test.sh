#!/usr/local/bin/bash
# 注意，使用数组方法时传递进去的数组一定要是${arr[*]}形式，因为函数不支持传递数组，所以我们要把数组的子元素全部传递进去，再在内部转换
cd $(dirname $0)
# 源文件的文件名
basename=$(basename $0)
testShFile=${basename%.test*}.sh
source "../functions/${testShFile}"
# 以上是自动读取对应源文件的动作 ======
arr=(1 2 3)
# ====== toString测试 =======
echo ===== toString测试 =======
toStringResult=`toString arr`
echo toStringResult======$toStringResult # 1 2 3

# ====== prop_length测试 =======
echo ===== prop_length测试 =======
toLengthResult=`prop_length arr`
echo toLengthResult====== $toLengthResult # 3
# ====== push测试
echo ===== push测试
arr=(`push arr 4`)
# echo toPushResult===$toPushResult
echo pushResult====${arr[@]}
# ====== slice测试
echo ===== slice测试
sliceResult=(`slice arr 0 2`)
echo sliceResult====${sliceResult[@]}
# ====== deleteByIndex测试
echo ===== deleteByIndex测试
deleteByIndexResult=(`deleteByIndex arr 1`)
echo deleteByIndexResult====${deleteByIndexResult[@]}
# ====== forEach测试
echo ===== forEach测试
callback() {
    item=$1
    index=$2
    echo "${item}===${index}" ~/callback
}

forEach arr callback