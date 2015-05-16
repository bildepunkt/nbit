Draw = require './src/draw'
Dom = require './src/dom'
Bitmap = require './src/bitmap'

dom = new Dom document.getElementById('nBit')
draw = new Draw dom.getCanvas().getContext('2d')
bitmap = new Bitmap

bm = bitmap.createBitmap [
    { x: 0, y: 0 },
    { x: 4, y: 4 }
]

console.log bm