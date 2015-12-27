'use strict';

var fs = require('fs'),
    path = require('path');

var scriptsPath = 'examples/';

function getFolders(dir) {
    return fs.readdirSync(dir)
    .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

console.log(getFolders(scriptsPath));
