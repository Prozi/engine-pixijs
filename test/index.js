'use strict'

const {
  Sprite,
  Container,
  ParticleContainer,
  Game,
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

  it('Proper initialize and lifecycle flow test', (done) => {
    const scene = new Scene({
      onUpdate() {
        done()
      }
    })
    new Game({
      children: [scene.transform]
    })
  })

})
