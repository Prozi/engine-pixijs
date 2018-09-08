'use strict'

const engine = require('@minininja/engine')

/**
 * Script extension with one parameter: the onUpdate function
 * @extends engine.Script
 */
class UpdateScript extends engine.Script {
  /**
   * @param {function} onUpdate the runner meat of script
   */
  constructor(onUpdate) {
    super(Object.assign({name: 'UpdateScript', onUpdate}, props))
  }
}

/**
 * GameObject extension with builtin afterUpdate handler
 * @extends engine.GameObject
 */
class GameObject extends engine.GameObject {
  constructor(props) {
    super(props)
    this.initialize(props)
  }
  /**
   * built in afterUpdate moving pixielement to position
   */
  afterUpdate() {
    super.afterUpdate()
    this.pixiElement.position.set(this.position.x, this.position.y)
  }
  /**
   * Initializes component with props, DUMMY / For Overwrite in extending class
   * @param {object} props
   * @param {string} [props.name=PixiScene]
   * @param {boolean} [props.active=true]
   * @param {function} [props.onEnable]
   * @param {function} [props.onDisable]
   * @param {function} [props.onStart]
   * @param {function} [props.onUpdate]
   */
  initialize(props) {
  }
}

/**
 * Simple GameObject API Sprite with this.container: PIXI.Sprite
 * @extends GameObject
 */
class Sprite extends GameObject {
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
  initialize(props) {    
    this.pixiElement = new window.PIXI.Sprite(props.config || null)
  }
}

/**
 * Simple GameObject API Container with PIXI.Container
 * @extends GameObject
 */
class Container extends GameObject {
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
  initialize(props) {
    this.pixiElement = new window.PIXI.Container()
  }
}

 /**
 * Simple GameObject API ParticleContainer with PIXI.particles.ParticleContainer
 * @extends GameObject
 */
 class ParticleContainer extends GameObject {
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
  initialize(props) {
    this.pixiElement = new window.PIXI.particles.ParticleContainer(props.config || {})
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
    super(Object.assign({name: 'PixiScene'}, props))
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
  initialize(props) {
    super.initialize()
    this.app = new window.PIXI.Application(props.config || null)
    this.app.stage.addChild(this.pixiElement)
    document.body.appendChild(this.app.view)
  }
}

if (typeof module !== 'undefined')
  module.exports = {
    GameObject, UpdateScript, Scene, Sprite, Container, ParticleContainer
  }
