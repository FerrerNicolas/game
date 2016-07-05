/* global myCanvas, Image */

// const { Turn } = require('./Turn.js')
// const C = require('./constants.js')
// const edge = 50
const TweenMax = require('gsap')
myCanvas.width = window.innerWidth
myCanvas.height = window.innerHeight
const ctx = myCanvas.getContext('2d')
ctx.imageSmoothingEnabled = false

const playerSprite = new Image()
playerSprite.src = './img/arch.png'
const explosionSprite = new Image(30, 30)
explosionSprite.src = './img/boom.png'

const player = { x: 0, y: 0, sprite: playerSprite }
const explosion = { x: 50, y: 50, sprite: explosionSprite }
var mov = TweenMax.to(player, 2, { x: 100, y: 100, sprite: playerSprite, repeat: -1, repeatDelay: 1, yoyo: true })
var dead = false

function renderLoop () {
  if (!dead && player.x < explosion.x && player.x + playerSprite.width * 2 > explosion.x && player.y < explosion.y && player.y + playerSprite.height * 2 > explosion.y) {
    dead = true
    mov.pause()
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    TweenMax.to(explosion, 4, { x: 50, y: 50, sprite: explosionSprite, opacity: 0, scale: 3 })
  } else if (!dead) {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    const { x, y, sprite } = player
    ctx.drawImage(sprite, x, y, sprite.width * 2, sprite.height * 2)
  } else {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    const { x, y, sprite } = explosion
    ctx.drawImage(sprite, x, y, sprite.width, sprite.height)
  }
}
renderLoop()

setInterval(function () {
  // turn = turn.evolve()
  renderLoop()
  console.log('step')
}, 30)

// const colors = ['black', 'blue']

/* function renderGame () {
  for (let i = 0; i < turn.board.length; ++i) {
    const row = turn.board[i]
    for (let j = 0; j < row.length; ++j) {
      const cell = row[j]
      const color = colors[cell]
      ctx.fillStyle = color
      ctx.fillRect(j * (edge + 5), i * (edge + 5), edge, edge)
    }
  }
}

renderGame()
setInterval(function () {
  //turn = turn.evolve()
  renderGame()
  console.log('step')
}, 500)

const KEY = {
  W: 87,
  A: 65,
  S: 83,
  D: 68
}
*/
/* document.addEventListener('keydown', function (e) {
  switch (e.keyCode) {
    case KEY.S: turn.setInput(0, C.DOWN)
  }
})
*/
