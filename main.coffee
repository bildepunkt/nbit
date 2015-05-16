Draw = require './src/draw'
Dom = require './src/dom'
Bitmap = require './src/bitmap'

dom = new Dom
draw = new Draw dom.getContext()
bitmap = new Bitmap

sprite =
    x: 9
    y: 6    
    map: [
        [1,1,1,1],
        [1,2,2,1],
        [1,2,2,1],
        [1,1,1,1]
    ]
    legend:
        '1': '#0C0'
        '2': '#C0C'

draw.fill('#DDD')
draw.render sprite