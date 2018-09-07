# @minininja/pixijs

*The engine* with pixijs. Ready for gamedev.


## Installation

`yarn add @minininja/pixijs`


## Documentation

https://prozi.github.io/engine-pixijs/


Read more about *The engine* here:

https://github.com/Prozi/engine/


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


## License

MIT


## Author

Jacek Pietal <prozi85@gmail.com>
