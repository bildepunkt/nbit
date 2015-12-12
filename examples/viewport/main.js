import Config from '../../dist/Config';
import Viewport from '../../dist/Viewport';

let config = new Config({
    bgColor: 'rgba(255, 255, 255, 0.5)'
});
let btn = document.querySelector('button');
let overlay = document.querySelector('.overlay');

btn.addEventListener('click', () => {
    overlay.className = overlay.className.replace(' hide', '');
    new Viewport({config});
});

document.addEventListener('keyup', e => {
    let canvas = document.querySelector('canvas');

    if (canvas && e.keyCode === 27) {
        overlay.className += ' hide';
        document.body.removeChild(canvas);
    }
});
