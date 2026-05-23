/* =========================================
CLOCK SYSTEM
========================================= */

function updateClock(){

const now =
new Date();

const time =

now.toLocaleTimeString(
[],
{
hour:'2-digit',
minute:'2-digit'
}
);

const clock =
document.getElementById(
"clock"
);

if(clock){

clock.innerText = time;

}

}

setInterval(
updateClock,
1000
);

updateClock();

/* =========================================
WINDOW SYSTEM
========================================= */

function openWindow(id){

const win =
document.getElementById(id);

if(win){

win.style.display = "flex";

win.style.zIndex =
Date.now();

}

}

function closeWindow(id){

const win =
document.getElementById(id);

if(win){

win.style.display = "none";

}

}

/* =========================================
CHATROOM
========================================= */

window.addEventListener(
"DOMContentLoaded",
()=>{

const sendButton =
document.getElementById(
"sendMessage"
);

const clearButton =
document.getElementById(
"clearChat"
);

const input =
document.getElementById(
"chatInput"
);

const messages =
document.getElementById(
"chatMessages"
);

/* LOAD SAVED CHAT */

const savedChat =
localStorage.getItem(
"jemChatroom"
);

if(savedChat){

messages.innerHTML =
savedChat;

}

/* SEND */

if(sendButton){

sendButton.onclick = ()=>{

if(input.value.trim() === "")
return;

const msg =
document.createElement(
"div"
);

msg.className =
"chat-message";

const timestamp =
new Date()
.toLocaleTimeString(
[],
{
hour:'2-digit',
minute:'2-digit'
}
);

msg.innerHTML =

`
<div class="chat-timestamp">

[${timestamp}]

</div>

<div class="chat-text">

${input.value}

</div>
`;

messages.appendChild(msg);

input.value = "";

messages.scrollTop =
messages.scrollHeight;

/* SAVE */

localStorage.setItem(
"jemChatroom",
messages.innerHTML
);

};

}

/* CLEAR */

if(clearButton){

clearButton.onclick = ()=>{

messages.innerHTML = "";

localStorage.removeItem(
"jemChatroom"
);

};

}

});
