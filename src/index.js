'use strict'

import * as PIXI from 'pixi.js'
import * as engine from '@minininja/engine'

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
export class Application extends PIXI.Application {
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
      this.state.mouse.set({ x: event.pageX, y: event.pageY })
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

/**
 * Utility base class for infinite animation class
 * please extend further for convenience
 * @extends Sprite
 */
export class AnimatedSprite extends Sprite {
  constructor(props = {}) {
    super(props);
    this.frame = -1
    this.props = props || {}
    this.props.frame.textureWidth = this.transform.texture.width
    this.afterUpdate()
  }
  updateTransform() {
    if (!this.props.transform) return
    Object.keys(this.props.transform).forEach((prop) => {
      this.transform[prop].set(this.props.transform[prop])
    })
  }
  getFrame() {
    return Math.floor(Date.now() * this.props.frame.speed) % this.props.frame.count
  }
  updateFrame(nextFrame) {
    this.frame = nextFrame
    const columns = this.props.frame.textureWidth / (this.props.frame.width + (this.props.frame.padding || 0))
    const col = this.frame % columns
    const row = Math.floor(this.frame / columns)
    this.transform.texture.frame = new PIXI.Rectangle(
      col * (this.props.frame.width + (this.props.frame.padding || 0)),
      row * (this.props.frame.height + (this.props.frame.padding || 0)),
      this.props.frame.width,
      this.props.frame.height)
  }
  afterUpdate() {
    const nextFrame = this.getFrame()
    if (this.frame !== nextFrame) {
      this.updateFrame(nextFrame)
      this.updateTransform()
    }
  }
}
