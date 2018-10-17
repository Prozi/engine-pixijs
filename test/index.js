'use strict'

const {
  Sprite,
  Container,
  ParticleContainer,
  Application,
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
    const game = new Application()
    game.stage.addChild(scene.transform)
  })

})
