# @minininja/pixijs

*The engine* with pixijs. Ready for gamedev.


## Installation

It requires pixi.js as peer dependency the great 2d framework.

`yarn add @minininja/pixijs pixi.js --save`

or

`npm install @minininja/pixijs pixi.js --save`


## Documentation

https://prozi.github.io/engine-pixijs/


Read more about *The engine* here:

https://github.com/Prozi/engine/


## Contents

✅ Sprite: GameObject

✅ Container: GameObject

✅ ParticleContainer: GameObject

✅ Scene: Container

... and more to come!


## Usage

web + webpack

```
const engine = require('@minininja/pixijs')
```


node

```
const engine = require('@minininja/pixijs')
```


then

```
const scene = new engine.Scene({})
const object = new engine.Sprite({ onUpdate () { console.log('foo') }})
scene.addChild(object)
setInterval(scene.onUpdate.bind(scene), 1000 / 60)
```


## About

All classes are extended from `GameObject` from *The engine*.


## License

MIT


## Author

Jacek Pietal <prozi85@gmail.com>
