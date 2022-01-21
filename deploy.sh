#!/usr/bin/env sh

# 发生错误时终止
set -e

rm -rf dist &&
yarn build &&
git add . &&
git commit -m 'deploy' &&
git branch -M main &&
git remote add origin git@github.com:gjf610/web-player.git
git push -f -u origin main
echo https://gjf610.github.io/web-player/dist/index.html