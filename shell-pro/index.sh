#!/bin/bash
# 解决相对路径问题 执行脚本前先进入脚本所在的目录
# cd $(dirname $0)
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd $SCRIPT_DIR
source "./functions/module.sh"
# 批量导入
functionsDir=`pwd`/functions
glob $functionsDir sh
<<'COMMENT' 
用字符串的方法测试下是否引入成功f
result=(`split a_b _`)
echo ${result[@]}
COMMENT
cd -