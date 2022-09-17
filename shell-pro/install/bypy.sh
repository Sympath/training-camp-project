# 安装linux版本百度云盘 https://www.jianshu.com/p/e8c9eb35316f
yum -y install python3
pip3 install bypy==1.7.12
bypy info
# linux 版百度云盘需要授权，授权过程是【1. `bypy info`触发授权 2. 访问输出的的地址获取授权码 3. 输入授权码进行验证】，这部分暂时需要手动处理