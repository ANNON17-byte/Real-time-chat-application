const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { generateToken, verifyToken } = require("./auth");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static("public"));

const users = {};       
const presence = {};    

app.post("/login", (req, res) => {
  const { username } = req.body;
  const token = generateToken({ username });
  res.json({ token });
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    socket.user = verifyToken(token);
    next();
  } catch {
    next(new Error("Unauthorized"));
  }
});

io.on("connection", (socket) => {
  const username = socket.user.username;

  users[username] = socket.id;
  presence[username] = { online: true, lastSeen: null };
  io.emit("presence", presence);

  socket.on("join-room", (room) => {
    socket.join(room);
    socket.room = room;
    socket.to(room).emit("system", `${username} joined ${room}`);
  });

  socket.on("chat-message", ({ text, id }) => {
    socket.to(socket.room).emit("chat-message", {
      user: username,
      text,
      id
    });
    socket.emit("delivered", id);
  });

  socket.on("read", (id) => {
    socket.to(socket.room).emit("read", id);
  });

  socket.on("private-message", ({ to, text }) => {
    if (users[to]) {
      io.to(users[to]).emit("private-message", {
        from: username,
        text
      });
    }
  });

  socket.on("disconnect", () => {
    presence[username] = {
      online: false,
      lastSeen: new Date().toLocaleString()
    };
    delete users[username];
    io.emit("presence", presence);
  });
});

server.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
