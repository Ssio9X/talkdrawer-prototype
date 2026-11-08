#!/bin/sh
# 사용법: sh scripts/snapshot.sh 10   → 현재 사이트를 versions/10/ 에 고정
set -e
cd "$(dirname "$0")/.."
N="$1"; [ -n "$N" ] || { echo "회차 번호를 넣어주세요: sh scripts/snapshot.sh 10"; exit 1; }
[ ! -e "versions/$N" ] || { echo "versions/$N 이 이미 있어요. 덮어쓰지 않습니다."; exit 1; }
mkdir -p "versions/$N"
cp -R landing v1 v2 v3 assets index.html "versions/$N/"
echo "versions/$N/ 고정 완료. versions/index.html 목록에 한 줄 추가하세요."
