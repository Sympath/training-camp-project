# 解决相对路径问题 执行脚本前先进入脚本所在的目录
cd $(dirname $0)
# 读取配置文件
source ./config
echo $name
echo $email
yum install git
git config --global user.name $name
git config --global user.email $email
ssh-keygen -t rsa -C $email
# 执行完成后切换会上一次目录 相当于 cd $OLDPWD
cd -