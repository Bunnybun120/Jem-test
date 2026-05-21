document.addEventListener("DOMContentLoaded",()=>{

/* =========================
CHAT ELEMENTS
========================= */

const chatBox =
document.getElementById("chatBox");

if(!chatBox) return;

const usernameInput =
document.getElementById("usernameInput");

const pfpInput =
document.getElementById("pfpInput");

const bioInput =
document.getElementById("bioInput");

const colorInput =
document.getElementById("colorInput");

const chatInput =
document.getElementById("chatInput");

const chatSend =
document.getElementById("chatSend");

const archiveChat =
document.getElementById("archiveChat");

const viewArchives =
document.getElementById("viewArchives");

const archiveModal =
document.getElementById("archiveModal");

const archiveList =
document.getElementById("archiveList");

const closeArchives =
document.getElementById("closeArchives");

/* =========================
FIREBASE
========================= */

const firebaseConfig = {

apiKey:
"AIzaSyAQkx8r6WwtLAjFfFSmlGEOTcCFvWb7hWI",

authDomain:
"chatroom-39c7a.firebaseapp.com",

databaseURL:
"https://chatroom-39c7a-default-rtdb.firebaseio.com",

projectId:
"chatroom-39c7a",

storageBucket:
"chatroom-39c7a.firebasestorage.app",

messagingSenderId:
"590743257861",

appId:
"1:590743257861:web:e386928c084ba704ca2d6c"

};

/* INIT */

if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

/* =========================
SEND MESSAGE
========================= */

function sendMessage(){

const text =
chatInput.value.trim();

if(!text) return;

const messageData = {

username:
usernameInput.value || "anon",

pfp:
pfpInput.value ||
"https://i.imgur.com/8Km9tLL.png",

bio:
bioInput.value || "",

color:
colorInput.value || "#ff4fd8",

text:text,

time:Date.now()

};

db.ref("messages")
.push(messageData)
.then(()=>{

chatInput.value="";

})
.catch(err=>{

console.error(err);

alert("Message failed to send.");

});

}

/* SEND BUTTON */

if(chatSend){

chatSend.addEventListener(
"click",
sendMessage
);

}

/* ENTER TO SEND */

if(chatInput){

chatInput.addEventListener(
"keydown",
e=>{

if(e.key==="Enter"){
sendMessage();
}

});

}

/* =========================
RENDER MESSAGE
========================= */

function renderMessage(data){

if(!data) return;

const timestamp =
new Date(data.time || Date.now());

const timeString =
timestamp.toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
});

const div =
document.createElement("div");

div.className = "chat-message";

div.innerHTML = `

<img
class="chat-pfp"
src="${data.pfp || 'https://i.imgur.com/8Km9tLL.png'}"
onerror="this.src='https://i.imgur.com/8Km9tLL.png'">

<div class="chat-bubble">

<div
style="
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:4px;
">

<div
style="
color:${data.color || '#ff4fd8'};
font-weight:bold;
font-size:16px;
">

${data.username || 'anon'}

</div>

<div
style="
font-size:11px;
opacity:0.6;
">

${timeString}

</div>

</div>

<div
style="
font-size:12px;
opacity:0.7;
margin-bottom:6px;
">

${data.bio || ""}

</div>

<div>
${data.text || ""}
</div>

</div>

`;

chatBox.appendChild(div);

chatBox.scrollTop =
chatBox.scrollHeight;

}

/* =========================
LIVE MESSAGES
========================= */

db.ref("messages")
.limitToLast(100)
.on("child_added",snapshot=>{

const data = snapshot.val();

renderMessage(data);

});

/* =========================
ARCHIVE CHAT
========================= */

if(archiveChat){

archiveChat.addEventListener("click",()=>{

db.ref("messages")
.once("value",(snapshot)=>{

const messages =
snapshot.val();

if(!messages){

alert("No messages to archive.");

return;

}

const archiveId =
"archive_" + Date.now();

db.ref("archives/" + archiveId)
.set(messages)
.then(()=>{

db.ref("messages").remove();

chatBox.innerHTML="";

alert("Chat archived.");

});

});

});

}

/* =========================
VIEW ARCHIVES
========================= */

if(viewArchives){

viewArchives.addEventListener("click",()=>{

archiveModal.style.display="flex";

archiveList.innerHTML="";

db.ref("archives")
.once("value",(snapshot)=>{

const archives =
snapshot.val();

if(!archives){

archiveList.innerHTML =
"<p>No archives yet.</p>";

return;

}

Object.keys(archives)
.reverse()
.forEach(key=>{

const div =
document.createElement("div");

div.className =
"archive-item";

div.innerHTML =
`📁 ${key}`;

div.addEventListener("click",()=>{

chatBox.innerHTML="";

const archiveMessages =
archives[key];

Object.values(archiveMessages)
.forEach(data=>{

renderMessage(data);

});

archiveModal.style.display =
"none";

});

archiveList.appendChild(div);

});

});

});

}

/* =========================
CLOSE ARCHIVES
========================= */

if(closeArchives){

closeArchives.addEventListener("click",()=>{

archiveModal.style.display =
"none";

});

}

});
/* =========================
LOAD SAVED PROFILE
========================= */

usernameInput.value =
localStorage.getItem("chat_username") || "";

pfpInput.value =
localStorage.getItem("chat_pfp") || "";

bioInput.value =
localStorage.getItem("chat_bio") || "";

colorInput.value =
localStorage.getItem("chat_color") || "#ff4fd8";

/* =========================
SAVE PROFILE
========================= */

function saveProfile(){

localStorage.setItem(
"chat_username",
usernameInput.value
);

localStorage.setItem(
"chat_pfp",
pfpInput.value
);

localStorage.setItem(
"chat_bio",
bioInput.value
);

localStorage.setItem(
"chat_color",
colorInput.value
);

}

/* AUTO SAVE */

usernameInput.addEventListener(
"input",
saveProfile
);

pfpInput.addEventListener(
"input",
saveProfile
);

bioInput.addEventListener(
"input",
saveProfile
);

colorInput.addEventListener(
"input",
saveProfile
);
