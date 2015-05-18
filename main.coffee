Draw = require './src/draw'
Dom = require './src/dom'
Sprite = require './src/sprite'
Input = require './src/input'
Collection = require './lib/collection'

dom = new Dom
draw = new Draw dom.getContext()
sprite1 = new Sprite
sprite2 = new Sprite
sprite2.setX 72
bitmap = [
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
]

sprite1.addBitmap 'front', bitmap
sprite2.addBitmap 'front', bitmap

sprite1.setLegend
    '1': '#6F4F38'
    '2': '#000000'
    '3': '#70B36C'
    '4': '#AEB36C'
sprite2.setLegend
    '1': '#6F4F00'
    '2': '#0000FF'
    '3': '#700000'
    '4': '#AE0000'

sprite1.setBitmap 'front', 0
sprite2.setBitmap 'front', 0

sprite1.setDraggable true
sprite2.setDraggable true

pool = new Collection
entities = new Collection
pool.addItem 'entities', entities

entities.addItem 's1', sprite1
entities.addItem 's2', sprite2

input = new Input
input.setEntityPool pool

render = ()->
    draw.fill('#DDD')
    entities.each((entity)->
        draw.render entity
    )
    requestAnimationFrame render

render()