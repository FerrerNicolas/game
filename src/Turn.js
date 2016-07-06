'use strict'
const clone = require('clone')
const C = require('./constants.js')
const TweenMax = require('gsap')

class Turn {
  constructor (players, inputs, projectiles) {
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
    if (projectiles === undefined) {
      this.projectiles = []
    } else {
      this.projectiles = projectiles
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
    const { players, inputs, projectiles } = this
    return new Turn(clone(players), clone(inputs), clone(projectiles))
  }
  addProjectile (whose, dir) {
    const proj = {x: this.players[whose].x, y: this.players[whose].y, whose: whose, dir: dir, speed: null, tween: null}
    switch (dir) {
      case 0: proj.tween = TweenMax.to(proj, 0.1, {y: '-=8px'})
        break
      case 1: proj.tween = TweenMax.to(proj, 0.1, {y: '-=8px', x: '+=8px'})
        break
      case 2: proj.tween = TweenMax.to(proj, 0.1, {x: '+=8px'})
        break
      case 3: proj.tween = TweenMax.to(proj, 0.1, {x: '+=8px', y: '+=8px'})
        break
      case 4: proj.tween = TweenMax.to(proj, 6, {y: '+=500px'})
        break
      case 5: proj.tween = TweenMax.to(proj, 0.1, {y: '+=8px', x: '-=8px'})
        break
      case 6: proj.tween = TweenMax.to(proj, 0.1, {x: '-=8px'})
        break
      case 7: proj.tween = TweenMax.to(proj, 0.1, {y: '-=8px', x: '-=8px'})
        break
    }
    this.projectiles.push(proj)
  }

  evolve () {
    const nextTurn = this.clone()
    const { players, inputs, projectiles } = nextTurn

    players.forEach((player, i) => {
      if (inputs[i].a === true) {
        player.xtween = TweenMax.to(player, 0.1, {x: '-=5px'})
      }
      if (inputs[i].d === true) {
        player.xtween = TweenMax.to(player, 0.1, {x: '+=5px'})
      }
      if (inputs[i].w === true) {
        player.ytween = TweenMax.to(player, 0.1, {y: '-=5px'})
      }
      if (inputs[i].s === true) {
        player.ytween = TweenMax.to(player, 0.1, {y: '+=5px'})
      }

      if (inputs[i].sup === true) {
        if (inputs[i].sleft === true) {
          nextTurn.addProjectile(i, 7)
        } else if (inputs[i].sright === true) {
          nextTurn.addProjectile(i, 1)
        } else {
          nextTurn.addProjectile(i, 0)
        }
      } else if (inputs[i].sdown === true) {
        if (inputs[i].sleft === true) {
          nextTurn.addProjectile(i, 5)
        } else if (inputs[i].sright === true) {
          nextTurn.addProjectile(i, 3)
        } else {
          nextTurn.addProjectile(i, 4)
        }
      } else if (inputs[i].sright === true) {
        nextTurn.addProjectile(i, 2)
      } else if (inputs[i].sleft === true) {
        nextTurn.addProjectile(i, 6)
      }
      console.log(projectiles)
      projectiles.forEach((proj, i) => {
        console.log(proj.tween)
        console.log(proj.y)
        proj.tween.play()
      })
    })
    return nextTurn
  }
}
exports.Turn = Turn
