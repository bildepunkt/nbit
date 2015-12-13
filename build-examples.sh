#!/bin/bash

for d in examples/*/
    do
    if [ "$d" != "examples/scripts/" ] && [ "$d" != "examples/styles/" ]
        then
        echo "bundling $d"
        node_modules/.bin/browserify $d/main.js -t babelify -o $d/bundle.js
    fi
done
