import Config from '../../../../dist/Config'
import Viewport from '../../../../dist/Viewport';
import Point from '../../../../dist/Point';
import Block from '../../../../dist/draw/Block';
import Line from '../../../../dist/draw/Line';

let config = new Config();
let viewport = new Viewport({config});
let line = new Line({config});

Block.setContext(viewport.getContext());

line.setPoints(
    new Point(4, 4), new Point(16, 32)
).render();
