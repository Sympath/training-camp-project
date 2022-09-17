#!/bin/bash
# 解决相对路径问题 执行脚本前先进入脚本所在的目录
cd $(dirname $0)
basename=`basename $0`
testShFile=${basename%.test*}.sh
source "../functions/${testShFile}"
function functionA () {
    echo "$1" # arguments are accessible through $1, $2,...
}
# 判断函数
resultFunctionA=`typeCheck Function functionA`
resultFunctionB=`typeCheck Function functionB`
# 判断数字
declare -i a
a=122+1
echo $a # 这个会输出123
resultNumberA=`typeCheck Number $a`
resultNumberB=`typeCheck Number $b`

echo $resultFunctionA # 0
echo $resultFunctionB # 1
echo $resultNumberA # 0
echo $resultNumberB # 1
# 执行完成后切换会上一次目录 相当于 `cd OLDPWD`
# if $isTrue; then
#    echo '存在includes'
# fi
cd -