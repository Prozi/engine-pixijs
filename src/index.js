'use strict'

const {GameObject} = require('@minininja/engine')

module.exports = function (PIXI) {

  class Sprite extends GameObject {
    constructor(props) {
      super(props)
      this.sprite = new PIXI.Sprite(props.config || null)
    }
  }

  class Container extends GameObject {
    constructor(props) {
      super(props)
      this.container = new PIXI.Container()
    }
  }

  class ParticleContainer extends GameObject {
    constructor(props) {
      super(props)
      this.container = new PIXI.particles.ParticleContainer(props.config || {})
    }
  }

  return {Sprite, Container, ParticleContainer}

}