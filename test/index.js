'use strict'

const PIXI = require('pixi.js')
const {Sprite, Container, ParticleContainer} = require('../src')(PIXI)

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

})
