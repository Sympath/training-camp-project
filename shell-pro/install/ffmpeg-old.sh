#!/usr/bin
#  2.1 安装依赖包
wget http://www.ffmpeg.org/releases/ffmpeg-3.1.tar.gz
tar -zxvf ffmpeg-3.1.tar.gz  -C ../
cd ../ffmpeg-3.1
#  2.1.1 先安装前置依赖yasm
wget http://www.tortall.net/projects/yasm/releases/yasm-1.3.0.tar.gz
tar -zxvf yasm-1.3.0.tar.gz
cd yasm-1.3.0
./configure && make && make install
cd ../
# 2.1.2 进行编译ffmpeg
./configure --prefix=/usr/local/ffmpeg --enable-shared --disable-debug  --disable-doc --enable-avresample --enable-nonfree --enable-gpl \
--enable-openssl  --disable-avcodec  --disable-swresample --disable-avfilter --disable-podpages --disable-yasm
make && make install
#  2.2 添加环境变量
echo "export PATH=$PATH:/usr/local/ffmpeg/bin" >> /etc/profile
source /etc/profile