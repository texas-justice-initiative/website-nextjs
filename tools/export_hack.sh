#!/bin/sh

./node_modules/next/dist/bin/next export
rm -rf out/content
cp -R content out/content
