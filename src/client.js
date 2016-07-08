const io = require('socket.io-client')
const socket = io()

socket.on('game:enemy', (i, j) => {
  button[i][j].texture = obuttontexture
  turn = 0
  var bigi = i%3
  bigi -= bigi%1
  var bigj = j%3
  bigj -= bigj%1
  console.log(i)
  console.log(j)
  console.log(bigi)
  console.log(bigj)
  if (cboard.x !== null) bigArea[cboard.x][cboard.y].tint = 0xFFFFFF
  cboard.x = bigi
  cboard.y = bigj
  bigArea[cboard.x][cboard.y].tint = 0xF5A9BC
  checkenemywin()
})

// add rendering from test.js
var renderer = new PIXI.CanvasRenderer(540, 540)
document.body.appendChild(renderer.view)
var stage = new PIXI.Container()
var turn = 0
var cboard = {x: null, y: null}

PIXI.loader.add('transparent', 'img/transparent.png').load(function (loader, resources) {
  bigArea = []
  for (var i = 0; i < 3; i++) {
    bigArea.push([])
    for (var j = 0; j < 3; j++) {
      bigArea[i].push(new PIXI.Sprite(resources.transparent.texture))
      bigArea[i][j].height = 180
      bigArea[i][j].width =  180
      bigArea[i][j].position.x = i * 180
      bigArea[i][j].position.y = j * 180
      stage.addChild(bigArea[i][j])
    }
  }
})

PIXI.loader.add('border', 'img/border.png').load(function (loader, resources) {
  var border = new PIXI.Sprite(resources.border.texture)
  stage.addChild(border)
})

PIXI.loader.add('button', 'img/button.png').load(function (loader, resources) {
  buttontexture = resources.button.texture
  button = []
  for (var i = 0; i < 9; i++) {
    button.push([])
    for (var j = 0; j < 9; j++) {
      button[i].push(new PIXI.Sprite(resources.button.texture))
      button[i][j].height = 50
      button[i][j].width = 50
      button[i][j].interactive = true

      button[i][j].on('mouseover', onDown)
      button[i][j].on('mouseout', onUp)
      button[i][j].on('mousedown', onClick)

      if (i === 0) {
        button[i][j].position.x = 15
      } else if (i === 3 || i === 6) {
        button[i][j].position.x = button[i - 1][j].position.x + 50 + 15
      } else {
        button[i][j].position.x = button[i - 1][j].position.x + 50 + 5
      }
      if (j === 0) {
        button[i][j].position.y = 15
      } else if (j === 3 || j === 6) {
        button[i][j].position.y = button[i][j - 1].position.y + 50 + 15
      } else {
        button[i][j].position.y = button[i][j - 1].position.y + 50 + 5
      }
      stage.addChild(button[i][j])
    }
  }

  animate()
})

function animate() {
  requestAnimationFrame(animate)
  renderer.render(stage)
}

PIXI.loader.add('xbutton', 'img/xbutton.png').load(function (loader, resources) {
  xbuttontexture = resources.xbutton.texture
})

PIXI.loader.add('obutton', 'img/obutton.png').load(function (loader, resources) {
  obuttontexture = resources.obutton.texture
})

function onDown(eventData) {
  var i = (this.position.x / 58) % 3
  i -= i%1
  var j = (this.position.y / 58) % 3
  j -= j%1
  if (bigArea[i][j].tint === 0xF5A9BC) {
    bigArea[i][j].tint = 0xBF00FF
  } else {
    bigArea[i][j].tint = 0xA9E2F3
  }
  this.tint = 0xA9E2F3
}

function onUp(eventData) {
  var i = (this.position.x / 58) % 3
  i -= i%1
  var j = (this.position.y / 58) % 3
  j -= j%1
  if (bigArea[i][j].tint === 0xBF00FF || bigArea[i][j].tint === 0xF5A9BC) {
    bigArea[i][j].tint = 0xF5A9BC
  } else {
    bigArea[i][j].tint = 0xFFFFFF
  }
  this.tint = 0xFFFFFF
}

function onClick(eventData) {
  var bigi = (this.position.x / 58) % 3
  bigi -= bigi%1
  var bigj = (this.position.y / 58) % 3
  bigj -= bigj%1
  var i = (this.position.x / 58)
  i -= i%1
  var j = (this.position.y / 58)
  j -= j%1
  if (turn === 0 && (cboard.x === null || (bigArea[cboard.x][cboard.y].texture === xbuttontexture || bigArea[cboard.x][cboard.y].texture === obuttontexture) || ((cboard.x * 180 <= this.position.x && (cboard.x + 1) * 180 >= this.position.x) && (cboard.y * 180 <= this.position.y && (cboard.y + 1) * 180 >= this.position.y)))) {
    socket.emit('game:move', i, j)
    turn = 1
    this.texture = xbuttontexture
    if (cboard.x !== null) bigArea[cboard.x][cboard.y].tint = 0xFFFFFF
    cboard.x = bigi
    cboard.y = bigj
    bigArea[cboard.x][cboard.y].tint = 0xF5A9BC
    checkmywin()
  }
}

function checkmywin() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (bigArea[i][j].texture !== xbuttontexture && bigArea[i][j].texture !== obuttontexture) {
        for (var k = 0; k < 3; k++) {
          if (button[i*3 + 0][(j*3)+k].texture === xbuttontexture && button[i*3 + 1][(j*3)+k].texture === xbuttontexture && button[i*3 + 2][(j*3)+k].texture === xbuttontexture) {
            bigArea[i][j].texture = xbuttontexture
          }
        }
        for (var k = 0; k < 3; k++) {
          if (button[(i*3)+k][(j*3)+0].texture === xbuttontexture && button[(i*3)+k][(j*3)+1].texture === xbuttontexture && button[(i*3)+k][(j*3)+2].texture === xbuttontexture) {
            bigArea[i][j].texture = xbuttontexture
          }
        }
        if (button[(i*3) + 0][(j*3) + 0].texture === xbuttontexture && button[(i*3) + 1][(j*3) + 1].texture === xbuttontexture && button[(i*3) + 2][(j*3) + 2].texture === xbuttontexture) {
          bigArea[i][j].texture = xbuttontexture
        } else if (button[(i*3) + 2][(j*3) + 0].texture === xbuttontexture && button[(i*3) + 1][(j*3) + 1].texture === xbuttontexture && button[(i*3) + 0][(j*3) + 2].texture === xbuttontexture) {
          bigArea[i][j].texture = xbuttontexture
        }
      }
    }
  }
}

function checkenemywin() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (bigArea[i][j].texture !== xbuttontexture && bigArea[i][j].texture !== obuttontexture) {
        for (var k = 0; k < 3; k++) {
          if (button[i*3 + 0][(j*3)+k].texture === obuttontexture && button[i*3 + 1][(j*3)+k].texture === obuttontexture && button[i*3 + 2][(j*3)+k].texture === obuttontexture) {
            bigArea[i][j].texture = obuttontexture
          }
        }
        for (var k = 0; k < 3; k++) {
          if (button[(i*3)+k][(j*3)+0].texture === obuttontexture && button[(i*3)+k][(j*3)+1].texture === obuttontexture && button[(i*3)+k][(j*3)+2].texture === obuttontexture) {
            bigArea[i][j].texture = obuttontexture
          }
        }
        if (button[(i*3) + 0][(j*3) + 0].texture === obuttontexture && button[(i*3) + 1][(j*3) + 1].texture === obuttontexture && button[(i*3) + 2][(j*3) + 2].texture === obuttontexture) {
          bigArea[i][j].texture = obuttontexture
        } else if (button[(i*3) + 2][(j*3) + 0].texture === obuttontexture && button[(i*3) + 1][(j*3) + 1].texture === obuttontexture && button[(i*3) + 0][(j*3) + 2].texture === obuttontexture) {
          bigArea[i][j].texture = obuttontexture
        }  
      }
    }
  }
}
