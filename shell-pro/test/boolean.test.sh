cd $(dirname $0)
# 源文件的文件名
basename=`basename $0`
testShFile=${basename%.test*}.sh
source "../functions/${testShFile}"
# 以上是自动读取对应源文件的动作 ====== 
a=1
echo [ a=1 ]
if boolean `a=1`; then
# ==== node npm（使用nvm
# source ../install/nvm.sh
echo '包含Nvm'
fi

if [[ "${string1}" == "${string2}" ]]; then
    echo "The two strings are the same"
fi
