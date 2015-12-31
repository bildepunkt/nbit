import Config from '../../src/Config';
import Canvas from '../../src/Canvas';
import Point from '../../src/Point';
import Bitmap from '../../src/Bitmap';
import Line from '../../src/Line';

let config = new Config({
    ppp: 32,
    viewportWidth: 40,
    viewportHeight: 30
});

let canvas = new Canvas({config});
let bitmap = new Bitmap().addMap([
    ['#43C', '#C34', '#43C'],
    ['#C34', '#3C4', '#C34'],
    ['#43C', '#C34', '#43C']
]);
let line = new Line().setPoints(
    new Point(2, 2),
    new Point(4, 8),
    new Point(12, 16)
);

canvas.render(line);
canvas.render(bitmap);
