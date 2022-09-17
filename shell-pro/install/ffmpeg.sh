#!/bin/sh
# 参考技术文章 https://cloud.tencent.com/developer/article/1985211
# 先安装epel-release 这个是yum扩展包
# https://blog.csdn.net/weixin_41831919/article/details/109035936（：EPEL (Extra Packages for Enterprise Linux)是基于Fedora的一个项目，为“红帽系”的操作系统提供额外的软件包，适用于RHEL、CentOS和Scientific Linux.
yum install epel-release -y
# 安装nux存储库
rpm -v --import http://li.nux.ro/download/nux/RPM-GPG-KEY-nux.ro
rpm -Uvh http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm
# 现在就安装ffmpeg
yum install ffmpeg ffmpeg-devel
# 验证
ffmpeg -version