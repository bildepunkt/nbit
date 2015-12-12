import Config from '../../dist/Config';
import Viewport from '../../dist/Viewport';

let config = new Config({
    parentEl: document.querySelector('#viewport')
});
let viewport = new Viewport({config});
