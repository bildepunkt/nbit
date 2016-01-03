import config from '../../src/config';
import Canvas from '../../src/Canvas';
import Collision from '../../src/Collision';
import Collection from '../../src/lib/Collection';
import CanvasInput from '../../src/lib/CanvasInput';
import Ticker from '../../src/Ticker';
import Point from '../../src/Point';
import Bitmap from '../../src/Bitmap';
import Line from '../../src/Line';

let canvas = new Canvas();
let ticker = new Ticker().start();

let canvasInput = new CanvasInput({
    useMouse: config.useMouse,
    canvas: canvas.getEl(),
    hitTestMethod: Collision.hitTest,
    canvasFit: true
});

let bitmap = new Bitmap().addMap([
    ['#43C', '#C34', '#43C'],
    ['#C34', '#3C4', '#C34'],
    ['#43C', '#C34', '#43C']
]);

let line = new Line().setPoints(
    new Point(2, 4),
    new Point(8, 16),
    new Point(32, 8)
);

let pool = new Collection().addItems(
    bitmap, line
);

canvasInput.setEntityPool(pool.getArray());
canvasInput.press = (e)=> console.log(e);

ticker.update = ()=> {
    canvas.renderPool(pool.getArray());
};