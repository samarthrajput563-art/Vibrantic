console.log("JS Loaded");

const input = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const chatBox = document.getElementById("chatBox");


const savedChat = localStorage.getItem("chatHistory");

if (savedChat) {
    chatBox.innerHTML = savedChat;
}

function saveChat() {
    localStorage.setItem("chatHistory", chatBox.innerHTML);
}


function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendButton.addEventListener("click", async () => {

    const message = input.value.trim();

    if (!message) return;
    sendButton.disabled = true;

    
    chatBox.innerHTML += `
        <div class="message user">
            ${message}
        </div>
    `;

    saveChat();
    scrollToBottom();

    input.value = "";
    input.focus();


    chatBox.innerHTML += `
        <div class="message bot" id="loadingMessage">
            Aether is thinking...
        </div>
    `;

    scrollToBottom();

    try {

        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        
        const loading = document.getElementById("loadingMessage");

        if (loading) {
            loading.remove();
        }

    
        chatBox.innerHTML += `
            <div class="message bot">
                ${data.response}
            </div>
        `;

        saveChat();
        scrollToBottom();

    } catch (error) {

        const loading = document.getElementById("loadingMessage");

        if (loading) {
            loading.remove();
        }

        chatBox.innerHTML += `
            <div class="message bot">
                Error connecting to server.
            </div>
        `;

        saveChat();
        scrollToBottom();
    }

    sendButton.disabled = false;
    input.focus();

});

input.addEventListener("keydown", (e) => {

    if (e.key === "Enter" && !sendButton.disabled) {
        sendButton.click();
    }

});


input.focus();

scrollToBottom();
const clearButton = document.getElementById("clearButton");

clearButton.addEventListener("click", () => {

    chatBox.innerHTML = `
        <div class="message bot">
            Hello, I'm Vibrantic. How can I assist you today?
        </div>
    `;

    localStorage.removeItem("chatHistory");

});
