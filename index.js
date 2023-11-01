const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();

const isDevelop = app.settings.env === "development";
const url = isDevelop
  ? "http://localhost:3000"
  : "https://whiteboard-client-tau.vercel.app";

const httpServer = createServer(app);
const io = new Server(httpServer);
io.engine.on("initial_headers", (headers, req) => {
  headers["Access-Control-Allow-Origin"] = url;
});
io.engine.on("headers", (headers, req) => {
  headers["Access-Control-Allow-Origin"] = url;
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
