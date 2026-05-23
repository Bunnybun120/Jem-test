/* =========================================
CLOCK
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
WINDOWS
========================================= */

function openWindow(id){

const win =
document.getElementById(id);

if(win){

win.style.display = "flex";

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

const sendButton =
document.getElementById(
"sendMessage"
);

const clearButton =
document.getElementById(
"clearChat"
);

if(sendButton){

sendButton.onclick = ()=>{

const input =
document.getElementById(
"chatInput"
);

const messages =
document.getElementById(
"chatMessages"
);

if(input.value.trim() === "")
return;

const msg =
document.createElement(
"div"
);

msg.style.marginBottom = "12px";

msg.innerText =
input.value;

messages.appendChild(msg);

input.value = "";

messages.scrollTop =
messages.scrollHeight;

};

}

if(clearButton){

clearButton.onclick = ()=>{

document.getElementById(
"chatMessages"
).innerHTML = "";

};

}
