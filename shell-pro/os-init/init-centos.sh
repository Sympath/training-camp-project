#!/bin/bash
# 解决相对路径问题 执行脚本前先进入脚本所在的目录
cd $(dirname $0)
source "../index.sh"
#===== sh远程连接
## 本地如果之前登陆过，需要执行下这个操作 不然登陆会报错
## rm -rf ~/.ssh/known_hosts 

#==== 先更新下源
# yum update -y
# git
params=(`getParams $*`)
hasGit=`arr_includes params git`
if boolean $hasGit; then
# source ../install/git/git.sh
echo '包含git'
fi

if boolean `arr_includes params nvm`; then
# ==== node npm（使用nvm
# source ../install/nvm.sh
echo '包含Nvm'
fi


