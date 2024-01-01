const messagesDiv = document.getElementById("messages");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");

const eventSource = new EventSource("/sse");

eventSource.onmessage = (event) => {
    if (event.type !== "message" || !event.data) {
        return;
    }

    const message = document.createElement("p");
    message.textContent = event.data;
    messagesDiv.appendChild(message);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

chatForm.addEventListener("submit", function(event) {
    event.preventDefault();
    fetch(`/chat?message=${messageInput.value}`).then(() => {
        messageInput.value = "";
    });
});
