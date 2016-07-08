'use strict'
const clone = require('clone')

class Turn {
  constructor (board = []) {
    this.board = board
  }

  clone () {
    const { board } = this
    return new Turn(clone(board))
  }

}

exports.Turn = Turn
