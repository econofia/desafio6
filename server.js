const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

httpServer.listen(8080, function () {
  console.log("Servidor corriendo en http://localhost:8080");
});

const messages = [
  { author: "Juan", text: "¡Hola! ¿Que tal?" },
  { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
  { author: "Ana", text: "¡Genial!" },
];


// el servidor el cual tenemos la variable io esté atento a que se realice una conexión:
io.on("connection", function (socket) {
  console.log("Un cliente se ha conectado");
  socket.emit("messages", messages);


  // cuando el servidor recibe un nuevo mensaje, lo agarra y lo suma al const de messages para transmitirselo a todo el resto.
  //Es un push al array mensajes.
  socket.on("new-message", (data) => {
    messages.push(data);
    io.sockets.emit("messages", messages); 
    //io.sockets.emit para avisarle a TODOS los usuarios conectados. sockets.emit sería solo para el que esté hablando conmigo.
 });
});

app.use(express.static("public"));