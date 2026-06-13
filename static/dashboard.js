console.log("Vibrantic AI Loaded");

/* =========================
ELEMENTS
========================= */

const input =
document.getElementById("userInput");

const sendButton =
document.getElementById("sendButton");

const chatContainer =
document.getElementById("chatContainer");

let chatHistory = [];

/* =========================
AUTO EXPAND TEXTAREA
========================= */

function autoResize(){

input.style.height = "auto";

input.style.height =
input.scrollHeight + "px";

}

input.addEventListener(
"input",
autoResize
);

/* =========================
MAGNETIC BUTTONS
========================= */

document
.querySelectorAll(".magnetic")
.forEach(button=>{

button.addEventListener(
"mousemove",
(e)=>{

const rect =
button.getBoundingClientRect();

const x =
e.clientX -
rect.left -
rect.width/2;

const y =
e.clientY -
rect.top -
rect.height/2;

button.style.transform =
`translate(${x*0.15}px,${y*0.15}px)`;

});

button.addEventListener(
"mouseleave",
()=>{

button.style.transform =
"translate(0,0)";

});

});

/* =========================
ADD USER MESSAGE
========================= */

function addUserMessage(text){

const message =
document.createElement("div");

let firstMessage = true;

message.className =
"user-message";

message.textContent =
text;

chatContainer.appendChild(
message
);

chatContainer.scrollTop =
chatContainer.scrollHeight;

}

/* =========================
ADD AI MESSAGE
========================= */

async function addAIMessage(text){

const message =
document.createElement("div");

message.className =
"ai-message";

chatContainer.appendChild(
message
);

const words =
text.split(" ");

for(const word of words){

message.textContent +=
word + " ";

chatContainer.scrollTop =
chatContainer.scrollHeight;

await new Promise(
resolve =>
setTimeout(resolve,35)
);

await addAIMessage(
data.response ||
"No response received."
);

}

}

/* =========================
TYPING INDICATOR
========================= */

function showTyping(){

const typing =
document.createElement("div");

typing.className =
"ai-message";

typing.id =
"typing";

typing.innerHTML = `
<div class="typing-indicator">
    <span></span>
    <span></span>
    <span></span>
</div>
`;

chatContainer.appendChild(
typing
);

chatContainer.scrollTop =
chatContainer.scrollHeight;
}

function removeTyping(){

const typing =
document.getElementById(
"typing"
);

if(typing){

typing.remove();

}

}

/* =========================
SEND MESSAGE
========================= */

async function sendMessage(){

const message =
input.value.trim();

if(!message) return;

addUserMessage(message);
if(firstMessage){

chatHistory.unshift(message);

saveHistory();

renderHistory();

}
if(firstMessage){

document
.getElementById("welcomeText")
.classList.add("hide-section");

document
.getElementById("promptTitle")
.classList.add("hide-section");

document
.getElementById("suggestions")
.classList.add("hide-section");

document
.getElementById("toolTitle")
.classList.add("hide-section");

document
.getElementById("tools")
.classList.add("hide-section");

firstMessage = false;

}

input.value = "";

input.style.height =
"auto";

showTyping();

try{

const response =
await fetch("/chat",{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

message:message

})

});

const data =
await response.json();

removeTyping();

addAIMessage(
data.response ||
"No response received."
);

}

catch(error){

console.error(error);

removeTyping();

addAIMessage(
"Connection error. Please try again."
);

}

}

/* =========================
SEND BUTTON
========================= */

sendButton.addEventListener(
"click",
sendMessage
);

/* =========================
ENTER TO SEND
========================= */

input.addEventListener(
"keydown",
(e)=>{

if(
e.key==="Enter"
&&
!e.shiftKey
){

e.preventDefault();

sendMessage();

}

}
);

/* =========================
CARD INTERACTION
========================= */

document
.querySelectorAll(
".card,.tool"
)
.forEach(card=>{

card.addEventListener(
"mousemove",
(e)=>{

const rect =
card.getBoundingClientRect();

const x =
e.clientX -
rect.left -
rect.width/2;

const y =
e.clientY -
rect.top -
rect.height/2;

card.style.transform =
`perspective(1000px)
rotateY(${x/20}deg)
rotateX(${-y/20}deg)
translateY(-6px)`;

});

card.addEventListener(
"mouseleave",
()=>{

card.style.transform =
"perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

});

});

/* =========================
SUGGESTION CLICK
========================= */

document
.querySelectorAll(".card")
.forEach(card=>{

card.addEventListener(
"click",
()=>{

input.value =
card.textContent;

autoResize();

input.focus();

});

});

/* =========================
   SIDEBAR COLLAPSE
========================= */

const sidebar =
document.querySelector(".sidebar");

const sidebarToggle =
document.getElementById("sidebarToggle");

sidebarToggle.addEventListener(
"click",
()=>{

sidebar.classList.toggle(
"collapsed"
);

});


/* =========================
   CURSOR SPOTLIGHT
========================= */

const spotlight =
document.getElementById(
"spotlight"
);

document.addEventListener(
"mousemove",
(e)=>{

spotlight.style.left =
e.clientX + "px";

spotlight.style.top =
e.clientY + "px";

});

/* =========================
   NEW CHAT
========================= */

function resetChat(){

chatContainer.innerHTML = "";

document
.getElementById("welcomeText")
.classList.remove("hide-section");

document
.getElementById("promptTitle")
.classList.remove("hide-section");

document
.getElementById("suggestions")
.classList.remove("hide-section");

document
.getElementById("toolTitle")
.classList.remove("hide-section");

document
.getElementById("tools")
.classList.remove("hide-section");

firstMessage = true;

input.value = "";

input.focus();

}

const newChatBtn =
document.getElementById(
"newChatBtn"
);

newChatBtn.addEventListener(
"click",
resetChat
);

/* =========================
   CHAT HISTORY
========================= */

function saveHistory(){

localStorage.setItem(
"vibrantic_history",
JSON.stringify(chatHistory)
);

}

function loadHistory(){

const saved =
localStorage.getItem(
"vibrantic_history"
);

if(saved){

chatHistory =
JSON.parse(saved);

renderHistory();

}

}

function renderHistory(){

const list =
document.getElementById(
"historyList"
);

list.innerHTML = "";

chatHistory.forEach(chat=>{

const item =
document.createElement("div");

item.className =
"history-item";

item.textContent =
chat;

list.appendChild(item);

});

}

loadHistory();