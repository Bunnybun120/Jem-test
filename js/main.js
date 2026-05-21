document.addEventListener("DOMContentLoaded",()=>{

/* CHAT ELEMENTS */

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

/* FIREBASE */

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

/* SEND MESSAGE */

function sendMessage(){

const text =
chatInput.value.trim();

if(!text) return;

const messageData = {

username:
usernameInput.value || "anon",

const timestamp =
new Date(data.time || Date.now());

const timeString =
timestamp.toLocaleTimeString([],{
hour:'2-digit',
minute:'2-digit'
});

div.innerHTML = `

<img
class="chat-pfp"
src="${data.pfp}"
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
color:${data.color};
font-weight:bold;
font-size:16px;
">

${data.username}

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
${data.text}
</div>

</div>

`;
.catch(err=>{

console.error(err);

alert("Message failed to send.");

});

}

/* SEND BUTTON */

chatSend.addEventListener(
"click",
sendMessage
);

/* ENTER KEY */

chatInput.addEventListener(
"keydown",
e=>{

if(e.key==="Enter"){
sendMessage();
}

});

/* RECEIVE MESSAGES */

db.ref("messages")
.limitToLast(100)
.on("child_added",snapshot=>{

const data = snapshot.val();

if(!data) return;

const div =
document.createElement("div");

div.className = "chat-message";

div.innerHTML = `

<img
class="chat-pfp"
src="${data.pfp}"
onerror="this.src='https://i.imgur.com/8Km9tLL.png'">

<div class="chat-bubble">

<div
style="
color:${data.color};
font-weight:bold;
font-size:16px;
">

${data.username}

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
${data.text}
</div>

</div>

`;

chatBox.appendChild(div);

chatBox.scrollTop =
chatBox.scrollHeight;

});

});
