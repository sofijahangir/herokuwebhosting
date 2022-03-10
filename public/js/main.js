const socket = io();
let name;
const textarea = document.querySelector('#textarea');
const messageArea = document.querySelector('.message__area');
do {
  name = prompt('Please enter your name: ');
} while (!name);

textarea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  const msg = {
    user: name,
    message: message.trim(),
  };
  // Append
  appendMessage(msg, 'outgoing');
  textarea.value = '';
  scrollToBottom();

  // Send to server
  socket.emit('message', msg);
}

function appendMessage(msg, type) {
  const mainDiv = document.createElement('div');
  const className = type;
  mainDiv.classList.add(className, 'message');

  const markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// Recieve messages
socket.on('message', (msg) => {
  appendMessage(msg, 'incoming');
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
