#!/bin/bash
tarName=dist.tar.gz
testServerDir=/root/node_web
# 服务器地址
targetServer=120.27.209.87
# git pull
ls | grep -v node_modules | xargs tar -czf $tarName
scp -P 22 $tarName root@${targetServer}:${testServerDir} 
rm -rf ${tarName}
ssh -p 22 root@${targetServer} << eeooff
# ssh -p 22 root@${targetServer} > /dev/null 2>&1 << eeooff
# ssh -p 22 root@${targetServer} 2>&1 << EOF
cd ${testServerDir}
ls | grep -v dist.tar.gz | grep -v node_modules | xargs rm -rf
tar -xzf dist.tar.gz
rm -rf dist.tar.gz
# npm install
npm restart
# npm start
eeooff
echo "代码部署完毕"

