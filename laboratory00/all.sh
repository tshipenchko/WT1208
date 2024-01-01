#!/usr/bin/env bash
for i in *.js; do
  echo "$i"
  node "$i"
done
