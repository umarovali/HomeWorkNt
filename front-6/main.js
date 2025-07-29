let chat = document.querySelector(".chat-messages");
let chatInput = document.querySelector(".chat-input");
let roomInput = document.querySelector(".room-input");
let sendBtn = document.querySelector(".chat-send-btn");
let joinBtn = document.querySelector(".room-join-btn");

const socket = io("http://localhost:3000/");

socket.on("chat", (data) => {
    chat.insertAdjacentHTML("beforeend", `
            <li class="msg-item">
            <h3 class="msg-title">${data.message}</h3>
            <sub class="msg-date">Дата: <b>${data.date}</b></sub>
            <p class="msg-name">${data.from}</p>
            <p class="msg-name">Группа: ${data.room}</p>
        </li>
        `)
})

sendBtn.addEventListener("click", (e) => {
    socket.emit("newMessage", { message: chatInput.value, room: roomInput.value })
})

joinBtn.addEventListener("click", (e) => {
    socket.emit("roomJoin", roomInput.value)
})