// const socket = io("http://localhost:8000", { transports: ["polling"] });
const socket = io("https://send-message.onrender.com/", { transports: ['polling'] });
const sendContainer = document.getElementById("send-container");
const messageInput = document.getElementById("messageImp");
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  if (sender === names) {
    messageElement.classList.add("right");
  } else {
    messageElement.classList.add("left");
  }
  messageContainer.appendChild(messageElement);
};

const names = prompt("Enter your name");

socket.emit("new-user-joined", names);

socket.on("user-joined", (data) => {
  append(`${data} join the chat`, "right");
});



sendContainer.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value;
  if (message.trim() !== "") {
    socket.emit("send-message", message);
    messageInput.value = "";
  }
});

// Append messages with the appropriate position ("left" or "right")
socket.on("receive-message", (data) => {
  const position = data.sender === names ? "right" : "left";
  append(`${data.message}`, position);
});

