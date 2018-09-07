'use strict'

const engine = require('@minininja/engine')

module.exports = function (PIXI) {

  /**
   * Simple GameObject API Sprite with this.container: PIXI.Sprite
   */
  class Sprite extends engine.GameObject {
    constructor(props) {
      super(props)
      this.sprite = new PIXI.Sprite(props.config || null)
    }
    onUpdate() {
      super.onUpdate()
      this.sprite.x = this.position.x
      this.sprite.y = this.position.y
    }
  }

  /**
   * Simple GameObject API Container with this.container: PIXI.Container
   */
  class Container extends engine.GameObject {
    constructor(props) {
      super(props)
      this.container = new PIXI.Container()
    }
    onUpdate() {
      super.onUpdate()
      this.container.x = this.position.x
      this.container.y = this.position.y
    }
  }

   /**
   * Simple GameObject API ParticleContainer with this.container: PIXI.particles.ParticleContainer
   */
   class ParticleContainer extends engine.GameObject {
    constructor(props) {
      super(props)
      this.container = new PIXI.particles.ParticleContainer(props.config || {})
    }
    onUpdate() {
      super.onUpdate()
      this.container.x = this.position.x
      this.container.y = this.position.y
    }
  }

  /**
   * Simple GameObject API Container with this.app: PIXI.Application
   */
  class Scene extends Container {
    constructor(props) {
      super(Object.assign({name: 'PixiScene'}, props))
      this.app = new PIXI.Application(props.config || null)
      this.app.stage.addChild(this.container)
      document.body.appendChild(this.app.view)
    }
  }

  return {Scene, Sprite, Container, ParticleContainer}

}
