'use strict';

var Config = require('../../dist/config');
var Collection = require('../../dist/collection');
var Viewport = require('../../dist/viewport');
var Point = require('../../dist/point');
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
var myPoint = new Point({
    config: myConfig,
    viewport: myViewport
});
console.log(myPoint.get('uid'));

// scene
var myScene = new Scene({
    Collection: Collection
});
myScene.addEntity(myPoint);
myScene.add({
    movingRt: true,
    movingDn: true,
    velocity: 6,
    dx: null,
    dy: null
});
myScene.set('dx', myScene.get('velocity')).set('dy', myScene.get('velocity'));
myScene.update = function() {
    var x = myPoint.get('x');
    var y = myPoint.get('y');
    var velocity = this.get('velocity');

    if (this.get('movingRt') && x + myConfig.get('scale') >= myConfig.get('width')) {
        this.set('dx', -velocity);
        this.set('movingRt', false);
    } else if (!this.get('movingRt') && x <= 0) {
        this.set('dx', velocity);
        this.set('movingRt', true);
    }

    if (this.get('movingDn') && y + myConfig.get('scale') >= myConfig.get('height')) {
        this.set('dy', -velocity);
        this.set('movingDn', false);
    } else if (!this.get('movingDn') && y <= 0) {
        this.set('dy', velocity);
        this.set('movingDn', true);
    }

    myPoint.set('x', x + this.get('dx')).set('y', y + this.get('dy'));
};

// game
var game = new Game({
    config: myConfig,
    scene: myScene,
    viewport: myViewport,
});
