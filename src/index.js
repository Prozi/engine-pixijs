'use strict'

const engine = require('@minininja/engine')

export default function (PIXI) {

  /**
   * Script extension with one parameter: the onUpdate function
   * @extends engine.Script
   */
  class UpdateScript extends engine.Script {
    /**
     * @param {function} onUpdate the runner meat of script
     */
    constructor(onUpdate) {
      super(Object.assign({
        name: 'UpdateScript',
        onUpdate
      }, props))
    }
  }

  /**
   * Simple GameObject API Sprite with this.container: PIXI.Sprite
   * @extends engine.GameObject
   */
  class Sprite extends engine.GameObject {
    /**
     * Initializes component with props, with PIXI.Sprite
     * @param {object} props
     * @param {string} [props.name=PixiScene]
     * @param {boolean} [props.active=true]
     * @param {function} [props.onEnable]
     * @param {function} [props.onDisable]
     * @param {function} [props.onStart]
     * @param {function} [props.onUpdate]
     */
    createTransform(config) {
      const sprite = new window.PIXI.Sprite(config || null)
      sprite.gameObject = this
      return sprite
    }
  }

  /**
   * Simple GameObject API Container with PIXI.Container
   * @extends engine.GameObject
   */
  class Container extends engine.GameObject {
    /**
     * Initializes component with props, with PIXI.Container
     * @param {object} props
     * @param {string} [props.name=PixiScene]
     * @param {boolean} [props.active=true]
     * @param {function} [props.onEnable]
     * @param {function} [props.onDisable]
     * @param {function} [props.onStart]
     * @param {function} [props.onUpdate]
     */
    createTransform(props) {
      const container = new window.PIXI.Container()
      container.gameObject = this
      return container
    }
  }

  /**
   * Simple GameObject API ParticleContainer with PIXI.particles.ParticleContainer
   * @extends engine.GameObject
   */
  class ParticleContainer extends engine.GameObject {
    /**
     * Initializes component with props, with PIXI.particles.ParticleContainer
     * @param {object} props
     * @param {string} [props.name=PixiScene]
     * @param {boolean} [props.active=true]
     * @param {function} [props.onEnable]
     * @param {function} [props.onDisable]
     * @param {function} [props.onStart]
     * @param {function} [props.onUpdate]
     */
    createTransform(config) {
      const container = new window.PIXI.particles.ParticleContainer(config || {})
      container.gameObject = this
      return container
    }
  }

  /**
   * Simple GameObject API Container with this.app: PIXI.Application
   * @extends Container
   */
  class Scene extends Container {
    /**
     * Initializes component with props, and PIXI.Container
     * @param {object} props
     * @param {string} [props.name=PixiScene]
     * @param {boolean} [props.active=true]
     * @param {function} [props.onEnable]
     * @param {function} [props.onDisable]
     * @param {function} [props.onStart]
     * @param {function} [props.onUpdate]
     */
    constructor(props) {
      super(Object.assign({
        name: 'PixiScene'
      }, props))
    }
  }

  /**
   * Simple GameObject API Container with this.app: PIXI.Application
   */
  class Game extends engine.GameObject {
    /**
     * Initializes component with props, and PIXI.Container
     * @param {object} props
     * @param {string} [props.name=Game]
     * @param {function} [props.onEnable]
     * @param {function} [props.onDisable]
     * @param {function} [props.onStart]
     * @param {function} [props.onUpdate]
     */
    constructor(props) {
      super(Object.assign({
        name: 'PixiGame'
      }, props))
      PIXI.ticker.shared.add(this.tick.bind(this))
    }
    tick() {
      const children = this.transform.children.filter((child) => child.gameObject).map((child) => child.gameObject)
      children.forEach((child) => child.onUpdate())
    }
    /**
     * Initializes component with props, and PIXI.Application
     * @param {object} props
     * @param {string} [props.name=PixiScene]
     * @param {boolean} [props.active=true]
     * @param {function} [props.onEnable]
     * @param {function} [props.onDisable]
     * @param {function} [props.onStart]
     * @param {function} [props.onUpdate]
     */
    createTransform(config) {
      this.app = new window.PIXI.Application(config || null)
      this.app.stage.gameObject = this
      document.body.appendChild(this.app.view)
      return this.app.stage
    }
  }

  return Object.assign({}, engine, {
    UpdateScript,
    Game,
    Scene,
    Sprite,
    Container,
    ParticleContainer
  })
}