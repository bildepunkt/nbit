import Config from '../../../nbit/Config'
import Viewport from '../../../nbit/Viewport';
import Point from '../../../nbit/Point';
import Block from '../../../nbit/draw/Block';
import Line from '../../../nbit/draw/Line';

let config = new Config();
let viewport = new Viewport({config});
let line = new Line({config});

Block.setContext(viewport.getContext());

line.setPoints(
    new Point(4, 4), new Point(16, 32)
).render();
