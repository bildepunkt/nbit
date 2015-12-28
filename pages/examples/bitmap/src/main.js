import Config from '../../../nbit/Config'
import Viewport from '../../../nbit/Viewport';
import Point from '../../../nbit/Point';
import Block from '../../../nbit/draw/Block';
import Bitmap from '../../../nbit/draw/Bitmap';

let config = new Config();
let viewport = new Viewport({config});
let bitmap = new Bitmap();

Block
    .setContext(viewport.getContext())
    .setBlockSize(config.blockSize);

bitmap.setMap([
    ['#C33', '#C33', '#C33'],
    ['#C33', '#3CC', '#C33'],
    ['#C33', '#C33', '#C33']
]).render();
