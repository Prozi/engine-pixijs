'use strict'

const PIXI = require('pixi.js')
const {Sprite, Container, ParticleContainer, Scene} = require('../src')(PIXI)

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

  it('Proper init flow test', () => {
    const scene = new Scene({})
    const object = new Sprite({ onUpdate () { this.updated = true }})
    scene.addChild(object)
    scene.onUpdate()
    expect(object.updated).toEqual(true)
  })

})
