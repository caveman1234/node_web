
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
cd /root/node_web
ls | grep -v dist.tar.gz | xargs rm -rf
tar -xzf dist.tar.gz
rm -rf dist.tar.gz
npm install
npm start
EOF
echo "前端代码部署测试完毕"
