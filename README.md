# @minininja/pixijs

*The @minininja/engine* + pixijs. Ready for game development.

It requires `pixi.js` as a peer dependency.


## Installation

`yarn add @minininja/pixijs pixi.js --save`

or

`npm install @minininja/pixijs pixi.js --save`


## Demo / Benchmark

[https://prozi.github.io/engine-pixijs/demo/](https://prozi.github.io/engine-pixijs/demo/)


## Demo Source Code

```javascript
'use strict'

import { utils, loader, ticker, Texture } from 'pixi.js'
import { Application, AnimatedSprite } from '../src'
import StatsScene from './statsScene'

export default class App extends Application {
  constructor() {
    super()
    this.loadAssets()
  }
  createCursor() {
    const $mouse = this.state.mouse
    this.cursor = this.createAnimatedFire(function () {
      this.transform.position.set($mouse.x, $mouse.y)
    })
    return this.cursor
  }
  createAnimatedFire(onUpdate) {
    return new AnimatedSprite({
      transform: {
        anchor: 0.5
      },
      frame: {
        padding: 200,
        width: 200,
        height: 200,
        count: 61,
        speed: 1 / 61 // whole turn = 1s default speed without multiplier
      },
      config: new Texture(utils.TextureCache.cursor),
      onUpdate
    })
  }
  addToScene(gameObject) {
    this.currentScene.transform.addChild(gameObject.transform)
  }
  loadAssets() {
    loader.add('cursor', 'static/img/fire_circles_400x400.png')
    loader.onComplete.add(() => {
      this.currentScene = new StatsScene()
      this.stage.addChild(this.currentScene.transform)  
      this.addToScene(this.createCursor())
      this.benchmark()
    })
    loader.load()
  }
  getAnimatedSpriteFrame(speed) {
    return Math.floor(Date.now() * speed) % this.props.frame.count
  }
  benchmark() {
    ticker.shared.add(() => {
      const speed = Math.random()
      const sprite = this.createAnimatedFire()
      sprite.getFrame = this.getAnimatedSpriteFrame.bind(sprite, speed)
      sprite.transform.position.set(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      )
      sprite.updateTransform()
      this.addToScene(sprite)
    })
  }
}
```

See at any time corresponding FPS to

`app.currentScene.transform.children.length`

All sprites are updated each frame if they're active (in benchmark they are)
And it works fast and smooth


## Documentation

[https://prozi.github.io/engine-pixijs/](https://prozi.github.io/engine-pixijs/)


## Must Read (Philosophy, Flow, Concepts)

Read more about *The engine* here:

[https://github.com/Prozi/engine/](https://github.com/Prozi/engine/)


## Contents of this repos' exports'

✅ UpdateScript: Script

✅ Sprite: GameObject

✅ AnimatedSprite: Sprite

✅ Container: GameObject

✅ ParticleContainer: GameObject

✅ Scene: Container

✅ Application: PIXI.Application

... and more to come!

* All classes<sup>1</sup> are extended from `GameObject` from *@minininja/engine*.

* And have a `transform` typeof `Transform` property that is a `PIXI.DisplayObject` descendant.

<sup>1</sup>) `Application` instead has a `currentScene` typeof `Scene`.


## License

MIT


## Author

Jacek Pietal <prozi85@gmail.com>
