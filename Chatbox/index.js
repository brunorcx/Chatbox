"use strict";
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 1337;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//Conexão de usúario
io.on("connection", function (socket) {
  socket.on("chat message", function (msg) {
    console.log("a user connected");

    //funcao para reverter a mensagem
    var splitMsg = msg.split("");
    var reverseMsg = splitMsg.reverse();
    var msgFinal = reverseMsg.join("");

    io.emit("chat message", msgFinal);
  });
});

io.on("disconnect", () => {
  console.log("user disconnected!");
});

http.listen(port, function () {
  console.log("listening on *:" + port);
});