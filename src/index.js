'use strict'

import * as PIXI from 'pixi.js'
import engine from '@minininja/engine'

/**
 * Script extension with one parameter: the onUpdate function
 * @extends engine.Script
 */
export class UpdateScript extends engine.Script {
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
export class Sprite extends engine.GameObject {
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
    const sprite = new PIXI.Sprite(config || null)
    sprite.gameObject = this
    return sprite
  }
}

/**
 * Simple GameObject API Container with PIXI.Container
 * @extends engine.GameObject
 */
export class Container extends engine.GameObject {
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
    const container = new PIXI.Container()
    container.gameObject = this
    return container
  }
}

/**
 * Simple GameObject API ParticleContainer with PIXI.particles.ParticleContainer
 * @extends engine.GameObject
 */
export class ParticleContainer extends engine.GameObject {
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
    const container = new PIXI.particles.ParticleContainer(config || {})
    container.gameObject = this
    return container
  }
}

/**
 * Simple GameObject API Container with this.app: PIXI.Application
 * @extends Container
 */
export class Scene extends Container {
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
 * Exntesion of PIXI.Application
 * with mouse and resize support
 * 
 * just add any of engine.* classes' transforms
 * and it will update their gameObjects' scripts
 */
export class Game extends PIXI.Application {
  /**
   * Initializes component with props, and PIXI.Container
   * @param {object} props
   * @param {string} [props.name=Game]
   * @param {function} [props.onEnable]
   * @param {function} [props.onDisable]
   * @param {function} [props.onStart]
   * @param {function} [props.onUpdate]
   */
  constructor(props = {}) {
    super({
      width: window.innerWidth,
      height: window.innerHeight
    })
    this.props = props
    this.state = {
      mouse: new engine.Vector3()
    }
    this.addCanvas()
    this.bindEvents()
    this.startScripts()
  }
  addCanvas() {
    document.body.appendChild(this.view)
  }
  bindEvents() {
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.renderer.resize(window.innerWidth, window.innerHeight)
      })
    })
    window.addEventListener('pointermove', (event) => {
      this.state.mouse.set({ x: event.screenX, y: event.screenY })
    })
  }
  updateScripts() {
    const scripts = this.stage.children.filter((child) => child.gameObject)
      .map((child) => child.gameObject)
    scripts.forEach((child) => child.onUpdate())
    scripts.forEach((child) => child.afterUpdate())
  }
  startScripts() {
    PIXI.ticker.shared.add(() => this.updateScripts())
  }
}
