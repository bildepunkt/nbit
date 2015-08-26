'use strict';

var Config = require('../../dist/config');
var Collection = require('../../dist/collection');
var Viewport = require('../../dist/viewport');
var Line = require('../../dist/line');
var Scene = require('../../dist/scene');
var Game = require('../../dist/game');

// config
var myConfig = new Config({
    width: 640,
    height: 480
});

// viewport
var myViewport = new Viewport({
    config: myConfig
});

// point
var myLine = new Line({
    config: myConfig,
    viewport: myViewport
});
myLine.setPoints({x: 4, y: 4}, {x: 16, y: 32});

// scene
var myScene = new Scene({
    Collection: Collection
});
myScene.addEntity(myLine);
myScene.update = function() {
    
};

// game
var game = new Game({
    config: myConfig,
    scene: myScene,
    viewport: myViewport,
});
