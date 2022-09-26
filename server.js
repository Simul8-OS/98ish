// server.js
const express = require("express")
const app = express()
const http = require("http")

const {Server} = require('socket.io')

const cors = require('cors');
app.use(cors());

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://3.89.90.6/",
    methods: ["GET", "POST"]
  }
})

server.listen(8000, () =>
  console.log("The server is all fired up on port 8000")
)

io.on("connection", (socket) => {
  console.log("New connection -->", socket.id)
  socket.emit("welcome", "Welcome to the socket!")
  socket.on("chat_message", (msg) => {
    console.log("message: " + msg.content)
    io.emit("server_message", msg)
  })
})