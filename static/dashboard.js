console.log("Vibrantic AI Loaded");

const input = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", async () => {

    const message = input.value.trim();

    if (!message) return;

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

        console.log(data.response);

    } catch (error) {

        console.error(error);

        alert("Error connecting to server.");

    }

});

input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        sendButton.click();

    }

});