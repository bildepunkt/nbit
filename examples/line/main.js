'use strict';

var Config = require('../../dist/config');
var Collection = require('../../dist/collection');
var Viewport = require('../../dist/viewport');
var Line = require('../../dist/line');
var Scene = require('../../dist/scene');
var Game = require('../../dist/game');

// config
var myConfig = new Config({
    width: 80,
    height: 60
});

// viewport
var myViewport = new Viewport({
    config: myConfig
});

// point
var rotation = 0;
var myLine = new Line({
    config: myConfig,
    viewport: myViewport
});
myLine.set('x', 40).set('y', 30);
myLine.setPoints({x: 0, y: 0}, {x: 16, y: 0});


// scene
var myScene = new Scene({
    Collection: Collection
});
myScene.addEntity(myLine);
myScene.update = function() {
    myLine.set('rotation', rotation += 4);
};

// game
var game = new Game({
    config: myConfig,
    scene: myScene,
    viewport: myViewport,
});
