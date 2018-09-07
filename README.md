# @minininja/pixijs

*The engine* with pixijs. Ready for gamedev.


## Installation

`yarn add @minininja/pixijs`


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
const PIXI = require('pixi.js')
const {Sprite, Container, ParticleContainer} = require('@minininja/pixijs')(PIXI)
```


node

```
const PIXI = require('pixi-shim')
const {Sprite, Container, ParticleContainer} = require('@minininja/pixijs')(PIXI)
```


## About

All classes are extended from `GameObject` from *The engine*.


## License

MIT


## Author

Jacek Pietal <prozi85@gmail.com>
