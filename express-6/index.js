const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io")
app.use(cors());
const server = http.createServer(app);
const date = new Date();

const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
};

const formatted = date.toLocaleString('ru-RU', options);


const io = new Server(server, {
    cors: {
        origin: "*"
    },
})

io.on("connect", (socket) => {
    socket.on("newMessage", (data) => {
        if (data.room) {
            io.to(data.room).emit("chat", { message: data.message, from: socket.id, date: formatted, room: data.room })
        } else {
            io.emit("chat", { message: data.message, from: socket.id, date: formatted, room: "Global" })
        }
    })
    socket.on("roomJoin", (data) => {
        socket.join(data)
    })
})



app.get("/", (req, res) => {
    res.json({ message: "Hello world" })
})

server.listen(3000, () => console.log("Server runing 3000 port"))