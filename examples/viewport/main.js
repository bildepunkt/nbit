import Config from '../../dist/Config';
import Viewport from '../../dist/Viewport';

// initialize new config object with custom bg color
let config = new Config({
    parentElBgColor: '#444',
    canvasBgColor: '#CCC'
});

// initialize the new Viewport passing in the config object
new Viewport({config});
