#!/bin/sh

BASE_PATH=/root/code/web/hila
PATH_WT=${BASE_PATH}/wt
PATH_GIT=${BASE_PATH}/git
PATH_WWW=${BASE_PATH}/www
PATH_WWW_NEW=${BASE_PATH}/www.new
PATH_WWW_OLD=${BASE_PATH}/www.old
PM2_APP_NAME=hila

set -x

#remove new dir if any
rm -fr ${PATH_WWW_NEW}

#copy all content from working tree to www new
cp -r ${PATH_WT} ${PATH_WWW_NEW}

#copy node_modules
cp -r ${PATH_WWW}/node_modules ${PATH_WWW_NEW}

#go to new and install packages
cd ${PATH_WWW_NEW}
npm prune
npm install

#build resources
gulp
if [ $? -ne 0 ]; then
    cd ${PATH_GIT}
    git --work-tree=${PATH_WT} reset --hard HEAD~
    set +x
    . ${PATH_WT}/.server/deploy/ascii/failed.sh "build failed!";
fi

#move content from new to current using rsync(delete the diff from current)
#adding / after ${PATH_WWW_NEW} is important for rsync!
rsync -a --delete ${PATH_WWW_NEW}/ ${PATH_WWW}

#reload app
pm2 reload ${PM2_APP_NAME}

#remove old
rm -fr ${PATH_WWW_NEW}

set +x
. ${PATH_WT}/.server/deploy/ascii/success.sh "Complete deploy successfully!"