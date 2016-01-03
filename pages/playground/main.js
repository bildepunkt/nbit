import config from '../../src/config';
import Canvas from '../../src/Canvas';
import Point from '../../src/Point';
import Bitmap from '../../src/Bitmap';
import Collision from '../../src/Collision';
import Collection from '../../src/lib/Collection';
import CanvasInput from '../../src/lib/CanvasInput';
import Line from '../../src/Line';

let canvas = new Canvas();

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
    bitmap
);

canvasInput.setEntityPool(pool);

canvas.render(line);
canvas.render(bitmap);

canvasInput.press = (e) => console.log(e);