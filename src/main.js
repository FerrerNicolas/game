/* global myCanvas, Image */

const { Turn } = require('./Turn.js')
// const edge = 50
// const TweenMax = require('gsap')
const C = require('./constants.js')
myCanvas.width = window.innerWidth
myCanvas.height = window.innerHeight
const ctx = myCanvas.getContext('2d')
ctx.imageSmoothingEnabled = false

setInterval(function () {
  // turn = turn.evolve()
  renderLoop()
  console.log('step')
}, 10)

const playerSprite = new Image()
playerSprite.src = './img/arch.png'
const explosionSprite = new Image(30, 30)
explosionSprite.src = './img/boom.png'
var turn = new Turn()
console.log(turn.players)
// const player = { x: 50, y: 0, sprite: playerSprite }
// const explosion = { x: 100, y: 100, sprite: explosionSprite, opacity: 1, scale: 1 }

// var mov = TweenMax.to(player, 5, { x: 0, sprite: playerSprite })
// setTimeout(function () {
//   TweenMax.to(player, 5, { x: 100, sprite: playerSprite })
// }, 1000)

// var dead = false

function renderLoop () {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
  turn.players.forEach((player, i) => {
    const sprite = playerSprite
    const {x, y} = player
    ctx.drawImage(sprite, x, y, sprite.width * 2, sprite.height * 2)
  })
  turn = turn.evolve()

  /* if (!dead && player.x <= explosion.x && player.x + playerSprite.width * 2 >= explosion.x && player.y <= explosion.y && player.y + playerSprite.height * 2 >= explosion.y) {
    dead = true
    mov.pause()
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    TweenMax.to(explosion, 1.5, { opacity: 0, x: 50, y: 50, sprite: explosionSprite, scale: 3 })
  } else if (!dead) {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    const { x, y, sprite } = player
    ctx.drawImage(sprite, x, y, sprite.width * 2, sprite.height * 2)
  } else {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    const { x, y, sprite, opacity, scale } = explosion
    ctx.globalAlpha = opacity
    ctx.drawImage(sprite, x, y, sprite.width * scale, sprite.height * scale)
    ctx.globalAlpha = 1
  } */
}
renderLoop()

const KEY = {
  W: 87,
  A: 65,
  S: 83,
  D: 68,
  SUP: 38,
  SDOWN: 40,
  SLEFT: 37,
  SRIGHT: 39
}

document.addEventListener('keydown', function (e) {
  switch (e.keyCode) {
    case KEY.S: turn.setInput(0, C.S, true)
      break
    case KEY.W: turn.setInput(0, C.W, true)
      break
    case KEY.A: turn.setInput(0, C.A, true)
      break
    case KEY.D: turn.setInput(0, C.D, true)
      break
    case KEY.SDOWN: turn.setInput(0, C.SDOWN, true)
      break
    case KEY.SUP: turn.setInput(0, C.SUP, true)
      break
    case KEY.SLEFT: turn.setInput(0, C.SLEFT, true)
      break
    case KEY.SRIGHT: turn.setInput(0, C.SRIGHT, true)
      break
  }
})

document.addEventListener('keyup', function (e) {
  switch (e.keyCode) {
    case KEY.S: turn.setInput(0, C.S, false)
      break
    case KEY.W: turn.setInput(0, C.W, false)
      break
    case KEY.A: turn.setInput(0, C.A, false)
      break
    case KEY.D: turn.setInput(0, C.D, false)
      break
    case KEY.SDOWN: turn.setInput(0, C.SDOWN, false)
      break
    case KEY.SUP: turn.setInput(0, C.SUP, false)
      break
    case KEY.SLEFT: turn.setInput(0, C.SLEFT, false)
      break
    case KEY.SRIGHT: turn.setInput(0, C.SRIGHT, false)
      break
  }
})
