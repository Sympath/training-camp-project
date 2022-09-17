#!/bin/bash
# 解决相对路径问题 执行脚本前先进入脚本所在的目录
cd $(dirname $0)
source ../libs/os.sh
platForm=$(getPlatForm)
echo $platForm
if [ [[ $platForm == 'linux' ]]]; then
# 先更新下curl和系统
yum update curl nss nss-util nspr
# 使用wget安装
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
cat >> .bash_profile << EOF
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
EOF
# 注意 这时你需要新开一个终端nvm命令才会生效
nvm install stable
nvm use stable

elif [[ $platForm == 'mac' ]]; then
    echo 执行mac的安装
else
   echo 执行win的安装
fi
# 执行完成后切换会上一次目录 相当于 `cd OLDPWD`
cd -