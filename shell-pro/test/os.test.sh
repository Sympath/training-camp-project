cd $(dirname $0)
# 源文件的文件名
basename=`basename $0`
testShFile=${basename%.test*}.sh
source "../functions/${testShFile}"
# 以上是自动读取对应源文件的动作 ====== 

# 执行函数
platForm=$(getPlatForm)
# 看输出结果
echo $platForm