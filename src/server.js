const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
var player1 = null
var player2 = null

app.use(express.static('dist'))
app.get('/', function (req, res) {
  res.sendfile('../dist/index.html')
})

io.on('connection', function (socket) {
  console.log(`${socket.id} connected`)
  if (player1 === null) {
    player1 = socket
  } else if (player2 === null) {
    player2 = socket
  }
  socket.on('disconnect', function () {
    if (player1 === socket) {
      console.log(`${socket.id} disconnected`)
      player1 = null
    } else if (player2 === socket) {
      console.log(`${socket.id} disconnected`)
      player2 = null
    }
  })
  socket.on('game:move', function (i, j) {
    setTimeout(function () {
      if (socket === player1) {
        player2.emit('game:enemy', i, j)
      } else {
        player1.emit('game:enemy', i, j)
      }
    }, 200)
  })
})

const PORT = process.env.PORT || 3000
http.listen(PORT, function () {
  console.log(`listening on *:${PORT}`)
})
