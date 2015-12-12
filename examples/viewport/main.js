import Config from '../../dist/Config';
import Viewport from '../../dist/Viewport';

// initialize new config object with custom bg color
let config = new Config({
    bgColor: 'rgba(255, 255, 255, 0.5)'
});
// initialize the new Viewport passing in the config object
new Viewport({config});

// setup the dom for showing hiding the canvas
let canvas = document.querySelector('canvas');
let btn = document.querySelector('button');
let overlay = document.querySelector('.overlay');
let hideClass = ' hide';

// hide canvas initially
canvas.className += hideClass;

btn.addEventListener('click', () => {
    overlay.className = overlay.className.replace(hideClass, '');
    canvas.className = canvas.className.replace(hideClass, '');
});

document.addEventListener('keyup', e => {
    if (e.keyCode === 27) {
        overlay.className += hideClass;
        canvas.className += hideClass;
    }
});
