import Config from '../../dist/Config';
import Viewport from '../../dist/Viewport';
import Block from '../../dist/draw/Block';

// initialize new config object
let config = new Config({
    blockSize: 32,
    viewportWidth: 32,
    viewportHeight: 24
});
// initialize the new Viewport passing in the config object
let viewport = new Viewport({config});
// initialize block with config, and initial values
let block = new Block({config}, 0, 0, '#C22');
block.render(viewport.getContext());

block.set({
    x: 8,
    y: 6,
    color: '#4C4'
});
block.render(viewport.getContext());

block.set({
    x: 16,
    y: 12,
    color: '#48F'
});
block.render(viewport.getContext());
