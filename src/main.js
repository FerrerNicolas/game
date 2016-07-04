/* global myCanvas */
// const { Turn } = require('./Turn.js')
const C = require('./constants.js')
var img = new Image()
img.src = './img/arch.png'

const edge = 50
myCanvas.width = window.innerWidth
myCanvas.height = window.innerHeight
const ctx = myCanvas.getContext('2d')

var spriteWidth = 50,
    spriteHeight = 50,
    pixelsLeft = 20,
    PixelsTop = 10,
    canvasPosX = 30,
    canvasPosY = 40

context.drawImage(img,
    pixelsLeft,
    pixelsTop,
    spriteWidth,
    spriteHeight,
    canvasPosX,
    canvasPosY,
    spriteWidth,
    spriteHeight
)
//const colors = ['black', 'blue']

/*function renderGame () {
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
/*document.addEventListener('keydown', function (e) {
  switch (e.keyCode) {
    case KEY.S: turn.setInput(0, C.DOWN)
  }
})
*/
