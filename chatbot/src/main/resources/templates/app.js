document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    let userMessage = document.getElementById("user-input").value;
    if (!userMessage) return;

    // Append user message to the chat
    appendMessage(userMessage, "user");

    // Clear input field
    document.getElementById("user-input").value = "";

    // Call the backend API
    fetch("http://localhost:8080/api/chat/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userMessage)
    })
    .then(response => response.json())
    .then(data => {
        // Assuming the response contains chatbot's reply
        const botMessage = data.choices[0].message.content;  // Modify as per actual response format
        appendMessage(botMessage, "bot");
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function appendMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);

    // Scroll to the bottom of the chat
    chatBox.scrollTop = chatBox.scrollHeight;
}
