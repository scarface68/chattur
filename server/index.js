const express = require("express")
const http = require("http")
const cors = require("cors")
const app = express()
const server = http.createServer(app)

// Enable CORS for all routes
app.use(cors())

const io = require("socket.io")(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow these HTTP methods
    allowedHeaders: ["my-custom-header"], // Allow these custom headers
    credentials: true // Enable credentials (cookies, authorization headers, etc.)
  },
})

const PORT = process.env.PORT || 5000

const users = {}
const socketToRoom = {}

io.on("connection", (socket) => {
  socket.on("join room", ({ roomID, user }) => {
    if (users[roomID]) {
      users[roomID].push({ userId: socket.id, user })
    } else {
      users[roomID] = [{ userId: socket.id, user }]
    }
    socketToRoom[socket.id] = roomID
    const usersInThisRoom = users[roomID].filter(
      (user) => user.userId !== socket.id
    )
    socket.emit("all users", usersInThisRoom)
  })

  // signal for offer
  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
      user: payload.user
    })
  })

  // signal for answer
  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id
    })
  })

  // send message
  socket.on("send message", (payload) => {
    io.emit("message", payload)
  })

  // disconnect
  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id]
    let room = users[roomID]
    if (room) {
      room = room.filter((item) => item.userId !== socket.id)
      users[roomID] = room
    }
    socket.broadcast.emit("user left", socket.id)
  })
})

console.clear()

server.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
)
