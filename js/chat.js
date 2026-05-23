const chatMessages =
document.getElementById("chatMessages");

const chatInput =
document.getElementById("chatInput");

const sendButton =
document.getElementById("sendMessage");

const usernameInput =
document.getElementById("usernameInput");

const pfpInput =
document.getElementById("pfpInput");

const saveProfile =
document.getElementById("saveProfile");

const profilePreview =
document.getElementById("profilePreview");

const typingIndicator =
document.getElementById("typingIndicator");

/* =========================================
PROFILE
========================================= */

let profile = JSON.parse(
localStorage.getItem("chatProfile")
) || {

username:"guest",
pfp:"https://i.imgur.com/8Km9tLL.png"

};

usernameInput.value =
profile.username;

pfpInput.value =
profile.pfp;

profilePreview.src =
profile.pfp;

/* =========================================
SAVE PROFILE
========================================= */

saveProfile.onclick = () => {

profile = {

username:
usernameInput.value || "guest",

pfp:
pfpInput.value || "https://i.imgur.com/8Km9tLL.png"

};

localStorage.setItem(
"chatProfile",
JSON.stringify(profile)
);

profilePreview.src =
profile.pfp;

};

/* =========================================
MESSAGES
========================================= */

let messages = JSON.parse(
localStorage.getItem("chatMessages")
) || [];

function renderMessages(){

chatMessages.innerHTML = "";

messages.forEach(msg => {

const div =
document.createElement("div");

div.className =
"chat-message";

div.innerHTML = `

<img src="${msg.pfp}">

<div class="message-content">

<div class="message-top">

<div class="message-user">

${msg.user}

</div>

<div class="message-time">

${msg.time}

</div>

</div>

<div class="message-text">

${msg.text}

</div>

</div>

`;

chatMessages.appendChild(div);

});

chatMessages.scrollTop =
chatMessages.scrollHeight;

}

/* =========================================
SEND MESSAGE
========================================= */

function sendMessage(){

if(!chatInput.value.trim()) return;

const msg = {

user:
profile.username,

pfp:
profile.pfp,

text:
chatInput.value,

time:
new Date().toLocaleTimeString([],{

hour:'2-digit',
minute:'2-digit'

})

};

messages.push(msg);

localStorage.setItem(
"chatMessages",
JSON.stringify(messages)
);

chatInput.value = "";

renderMessages();

}

/* =========================================
BUTTON
========================================= */

sendButton.onclick =
sendMessage;

/* =========================================
ENTER KEY
========================================= */

chatInput.addEventListener(
"keypress",
e=>{

if(e.key==="Enter"){

sendMessage();

}

}
);

/* =========================================
TYPING
========================================= */

chatInput.addEventListener(
"input",
()=>{

typingIndicator.innerText =
`${profile.username} is typing...`;

clearTimeout(window.typingTimeout);

window.typingTimeout =
setTimeout(()=>{

typingIndicator.innerText = "";

},1000);

}
);

/* =========================================
INIT
========================================= */

renderMessages();
