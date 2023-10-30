const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: "http://localhost:3000",
});

io.on("connection", (socket) => {
  console.log("Server Connected");

  socket.on("startDraw", (data) => {
    socket.broadcast.emit("startDraw", data);
  });

  socket.on("drawLine", (data) => {
    socket.broadcast.emit("drawLine", data);
  });

  socket.on("changeSettings", (data) => {
    socket.broadcast.emit("changeSettings", data);
  });
});

httpServer.listen(4000);
