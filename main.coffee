Draw = require './src/draw'
Dom = require './src/dom'
Sprite = require './src/sprite'
Input = require './src/input'
Collection = require './lib/collection'

dom = new Dom
draw = new Draw dom.getContext()
sprite = new Sprite
sprite.addBitmap 'blank',
[
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
]
sprite.addBitmap 'front',
[
    [0, 0, 2, 2, 2, 2, 2, 0, 0],
    [0, 2, 1, 2, 1, 2, 1, 2, 0],
    [0, 2, 1, 1, 1, 1, 1, 2, 0],
    [0, 3, 3, 4, 4, 4, 3, 3, 0],
    [3, 3, 3, 3, 4, 3, 3, 3, 3],
    [3, 0, 3, 3, 3, 3, 3, 0, 3],
    [1, 0, 3, 3, 3, 3, 3, 0, 1],
    [0, 0, 3, 0, 0, 0, 3, 0, 0],
    [0, 0, 3, 0, 0, 0, 3, 0, 0],
    [0, 2, 2, 0, 0, 0, 2, 2, 0],
],
[
    [0, 0, 2, 2, 2, 2, 2, 0, 0],
    [0, 2, 1, 2, 1, 2, 1, 2, 0],
    [0, 2, 1, 1, 1, 1, 1, 2, 0],
    [0, 3, 3, 4, 4, 4, 3, 0, 0],
    [3, 3, 3, 3, 4, 3, 3, 0, 0],
    [3, 0, 3, 3, 3, 3, 3, 0, 0],
    [1, 0, 3, 3, 3, 3, 3, 0, 0],
    [0, 0, 3, 0, 0, 0, 3, 0, 0],
    [0, 0, 3, 0, 0, 0, 3, 0, 0],
    [0, 2, 2, 0, 0, 0, 2, 2, 0],
]
sprite.setLegend
    '1': '#6F4F38'
    '2': '#000000'
    '3': '#70B36C'
    '4': '#AEB36C'
sprite.setBitmap 'front', 1

pool = new Collection
entities = new Collection
pool.addItem 'entities', entities
entities.addItem 's', sprite

draw.fill('#DDD')
draw.render sprite

input = new Input
input.setEntityPool pool