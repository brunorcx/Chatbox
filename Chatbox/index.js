"use strict";
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 1337;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//Conex�o de us�ario
io.on("connection", function (socket) {
  socket.on("chat message", function (msg) {
    console.log("a user connected");

    //funcao para reverter a mensagem
    var splitMsg = msg.split("");
    var reverseMsg = splitMsg.reverse();
    var msgFinal = reverseMsg.join("");

    if (isNaN(msg)) io.emit("chat message", msgFinal);
    else io.emit("chat message", tamanhoMensagens(msgFinal));
  });
});

io.on("disconnect", () => {
  console.log("user disconnected!");
});

http.listen(port, function () {
  console.log("listening on *:" + port);
});

function tamanhoMensagens(numByte) {
  var texto = "";
  for (var i = 0; i < numByte; i++) {
    texto = texto + "a";
    if (numByte % 100 == 0) texto = texto + "\n";
  }
  return texto;
}

var sIO = {};

sIO.on = (function () {
  var messages = {};
  var speedLimit = 5; //5ms
  return function (message, handler) {
    messages[message] = messages[message] || {};
    if (
      messages[message].timestamp &&
      new Date().getTime() - messages[message].timestamp < speedLimit
    )
      return false;
    else messages[message].timestamp = new Date().getTime();

    handler();
    return true;
    //execute code, Ex:
  };
})();
