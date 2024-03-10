#!/usr/bin/env bash

set -e 
cd $(dirname $0)/..

if [ $# -lt 1 ]; then
  echo "Usage: $0 the title of my new blog"
  exit 1
fi

today=$(date +%Y-%m-%d)
title=$(echo $* | tr ' ' '-' | tr 'A-Z' 'a-z')
hugo new content posts/$today-$title

