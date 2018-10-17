# @minininja/pixijs

*The @minininja/engine* + pixijs. Ready for game development.

It requires `pixi.js` as a peer dependency.


## Installation

`yarn add @minininja/pixijs pixi.js --save`

or

`npm install @minininja/pixijs pixi.js --save`


## Demo / Benchmark

https://prozi.github.io/engine-pixijs/demo/

See at any time corresponding FPS to

`app.currentScene.transform.children.length`

All sprites are updated each frame if they're active (in benchmark they are)
And it works fast and smooth


## Documentation

https://prozi.github.io/engine-pixijs/


Read more about *The engine* here:

https://github.com/Prozi/engine/


## Contents

✅ UpdateScript: Script

✅ Sprite: GameObject

✅ Container: GameObject

✅ ParticleContainer: GameObject

✅ Scene: Container

✅ Application: PIXI.Application

✅ AnimatedSprite: Sprite

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
const scene = new engine.Scene()
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
