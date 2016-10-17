#!/bin/sh

BASE_PATH=/root/code/web/hila
PATH_WT=${BASE_PATH}/wt
PATH_GIT=${BASE_PATH/git
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

#make current to old
mv ${PATH_WWW} ${PATH_WWW_OLD}

#make new to current
mv ${PATH_WWW_NEW} ${PATH_WWW}

#remove old
rm -fr ${PATH_WWW_OLD}

#reload app
pm2 reload ${PM2_APP_NAME}
set +x
. ${PATH_WT}/.server/deploy/ascii/success.sh "Complete deploy successfully!"