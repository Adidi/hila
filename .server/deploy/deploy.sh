#!/bin/sh

BASE_PATH=/home/axonize/code
PATH_WT=${BASE_PATH}/git/admin.$1.wt
PATH_HTML=${BASE_PATH}/html

set -x
rm -fr ${PATH_HTML}/admin.$1.new
cp -r ${PATH_WT} ${PATH_HTML}/admin.$1.new
cp -r ${PATH_HTML}/admin.$1/node_modules ${PATH_HTML}/admin.$1.new
cd ${PATH_HTML}/admin.$1.new
npm prune
npm install
webpack
if [ $? -ne 0 ]; then
    cd ${BASE_PATH}/git/admin.$1.git
    git --work-tree=${PATH_WT} reset --hard HEAD~
    set +x
    . ${PATH_WT}/.server/deploy/ascii/failed.sh "build failed!";
fi
mv ${PATH_HTML}/admin.$1 ${PATH_HTML}/admin.$1.old
mv ${PATH_HTML}/admin.$1.new ${PATH_HTML}/admin.$1
rm -fr ${PATH_HTML}/admin.$1.old
pm2 reload admin.$1
set +x
. ${PATH_WT}/.server/deploy/ascii/success.sh "Complete $1 deploy successfully!"