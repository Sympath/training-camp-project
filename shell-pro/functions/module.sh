#!/bin/bash
# 解决相对路径问题 执行脚本前先进入脚本所在的目录
<<'COMMENT'
批量导入指定类型文件
@case glob /etc sh 批量导入/etc下所有sh文件
@param targetDir 目标目录路径
@param suffix 目标文件后缀
COMMENT
function glob () {
    local targetDir=$1
    local suffix=$2
    for shFilename in `ls $targetDir | grep .${suffix}`
    do 
    source "${targetDir}/${shFilename}"
    done
}
