// Socket server implementation only for now. User configuration with MongoDB pending.
// Refer to "server" folder for MongoDB configuration

// Import express and instantiate an express server called "app"
const express = require("express")
const app = express()

// Middleware
const cors = require('cors');
app.use(cors());

const server = app.listen(8000, () =>
  console.log("The server is all fired up on port 8000")
)

// To initialize the socket, we need to
// invoke the socket.io library
// and pass it our Express server
const io = require("socket.io")(server, { cors: true })

io.on("connection", (socket) => {
  console.log("New connection -->", socket.id)
  socket.emit("welcome", "Welcome to the socket!")
  socket.on("chat_message", (msg) => {
    console.log("message: " + msg.content)
    io.emit("server_message", msg)
  })
})
