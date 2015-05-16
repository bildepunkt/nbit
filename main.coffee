Draw = require './src/draw'
Dom = require './src/dom'
Bitmap = require './src/bitmap'

dom = new Dom
draw = new Draw dom.getContext()
bitmap = new Bitmap

bm = bitmap.fromPoints [
    { x: 0, y: 0 },
    { x: 4, y: 4 },
    { x: 8, y: 0 },
    { x: 12, y: 4 }
]

sprite =
    x: 0
    y: 0
    map: bm
    legend:
        '1': '#CCC'

draw.render sprite