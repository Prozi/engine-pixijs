'use strict'

const PIXI = require('pixi.js')
const {Sprite, Container, ParticleContainer, Scene} = require('../src')

/*global describe,it,expect*/
describe('Base TEST', () => {

  it('Sprite should gracefully work', () => {
    expect(() => new Sprite({})).not.toThrow()
  })

  it('Container should gracefully work', () => {
    expect(() => new Container()).not.toThrow()
  })

  it('ParticleContainer should gracefully work', () => {
    expect(() => new ParticleContainer({})).not.toThrow()
  })

  it('Scene should gracefully work', () => {
    expect(() => new Scene({})).not.toThrow()
  })

  it('Proper initialize and lifecycle flow test', () => {
    const scene = new Scene({
      children: [new Sprite({ onUpdate () { this.position.x = 1337 }})]
    })
    scene.onUpdate()
    expect(scene.children[0].pixiElement.position.x).toEqual(1337)
  })

})
