import Xhr from './src/Xhr';

let pre = document.querySelector('#code');

// this 'main.js' will be the file relative to each example, thereby fetching the
// example's code file
Xhr.get('main.js', function (data) {
    console.log(data);
    pre.innerHTML = data;
});