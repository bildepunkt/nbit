var xhr = {
    get: function(url, callback, type) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = type || '';

        xhr.onload = function() {
            if (this.status == 200) {
                callback(this.response);
            }
        };

        xhr.send();
    }
};

var pre = document.querySelector('#code');

// this 'main.js' will be the file relative to each example, thereby fetching the
// example's code file
xhr.get('main.js', function (data) {
    console.log(data);
    pre.innerHTML = data;
});