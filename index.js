const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const isDevelop = app.settings.env === "development";
const url = isDevelop
  ? "http://localhost:3000"
  : "https://whiteboard-client-tau.vercel.app";
app.use(cors());
const httpServer = createServer();
const io = new Server(httpServer, {});
io.engine.on("headers", (headers, req) => {
  headers["Access-Control-Allow-Origin"] = url;
  headers["Access-Control-Allow-Headers"] =
    "origin, x-requested-with, content-type";
  headers["Access-Control-Allow-Methodsn"] = "PUT, GET, POST, DELETE, OPTIONS";
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

httpServer.listen(5000);
