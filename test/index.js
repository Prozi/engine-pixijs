'use strict'

const PIXI = require('pixi.js')
const {
  Sprite,
  Container,
  ParticleContainer,
  Scene
} = require('../src')

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
    const gameObject = new Sprite({
      onUpdate() {
        console.log('updated!')
        this.transform.position.x = 1337
      }
    })
    const scene = new Scene({
      children: [gameObject.transform]
    })
    scene.onUpdate()
    expect(scene.transform.children[0].position.x).toEqual(1337)
  })

})