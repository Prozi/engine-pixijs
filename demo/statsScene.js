'use strict'

import Stats from 'stats-js'
import { Scene } from '../src'

export default class StatsScene extends Scene {
  constructor() {
    super()
    this.addStats()
  }
  addStats() {
    this.stats = new Stats()
    document.body.appendChild(this.stats.domElement)
  }
  onUpdate() {
    this.stats.begin()
    super.onUpdate()
  }
  afterUpdate() {
    super.afterUpdate()
    this.stats.end()
  }
}
