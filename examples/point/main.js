var Config = require('../../dist/config');
var Collection = require('../../dist/collection');
var Viewport = require('../../dist/viewport');
var Point = require('../../dist/point');
var Scene = require('../../dist/scene');
var Game = require('../../dist/game');

var myConfig = new Config();
var myViewport = new Viewport({
    config: myConfig
});

var myPoint = new Point({
    config: myConfig,
    viewport: myViewport
});
console.log(myPoint.get('uid'));

var myScene = new Scene({
    Collection: Collection
});
myScene.addEntity(myPoint);

var game = new Game({
    config: myConfig,
    scene: myScene,
    viewport: myViewport,
});

myScene.update = function() {
    var x = myPoint.get('x');
    myPoint.set('x', x + 8);
};
