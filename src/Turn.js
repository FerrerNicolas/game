'use strict'
const clone = require('clone')
const C = require('./constants.js')
const TweenMax = require('gsap')

class Turn {
  constructor (players, inputs) {
    if (players === undefined) {
      this.players = [{x: 0, y: 0, alive: true, xtween: null, ytween: null}]
    } else {
      this.players = players
    }
    if (inputs === undefined) {
      this.inputs = [{w: false, a: false, s: false, d: false, sup: false, sdown: false, sleft: false, sright: false}]
    } else {
      this.inputs = inputs
    }
  }

  setInput (playerIndex, key, value) {
    switch (key) {
      case C.S: this.inputs[playerIndex].s = value
        break
      case C.W: this.inputs[playerIndex].w = value
        break
      case C.A: this.inputs[playerIndex].a = value
        break
      case C.D: this.inputs[playerIndex].d = value
        break
      case C.SUP: this.inputs[playerIndex].sup = value
        break
      case C.SDOWN: this.inputs[playerIndex].sdown = value
        break
      case C.SLEFT: this.inputs[playerIndex].sleft = value
        break
      case C.SRIGHT: this.inputs[playerIndex].sright = value
        break
    }
  }

  clone () {
    const { players, inputs } = this
    return new Turn(clone(players), clone(inputs))
  }

  evolve () {
    const nextTurn = this.clone()
    const { players, inputs } = nextTurn

    players.forEach((player, i) => {
      if (inputs[i].a === true) {
        player.xtween = TweenMax.to(player, 0.01, {x: '-=5px'})
      }
      if (inputs[i].d === true) {
        player.xtween = TweenMax.to(player, 0.01, {x: '+=5px'})
      }
      if (inputs[i].w === true) {
        player.ytween = TweenMax.to(player, 0.01, {y: '-=5px'})
      }
      if (inputs[i].s === true) {
        player.ytween = TweenMax.to(player, 0.01, {y: '+=5px'})
      }
    })
    return nextTurn
  }
}
exports.Turn = Turn
