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

function addAIMessage(text){

const message =
document.createElement("div");

message.className =
"ai-message";

message.textContent =
text;

chatContainer.appendChild(
message
);

chatContainer.scrollTop =
chatContainer.scrollHeight;

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

typing.innerHTML =
"Thinking...";

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
