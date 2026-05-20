document.addEventListener("DOMContentLoaded",()=>{

/* DRAG */

document.querySelectorAll(".draggable").forEach(win=>{

const bar=win.querySelector(".titlebar");

if(!bar) return;

let drag=false;
let x=0;
let y=0;

bar.addEventListener("mousedown",e=>{

drag=true;

x=e.clientX-win.offsetLeft;
y=e.clientY-win.offsetTop;

});

document.addEventListener("mousemove",e=>{

if(!drag) return;

win.style.left=(e.clientX-x)+"px";
win.style.top=(e.clientY-y)+"px";

});

document.addEventListener("mouseup",()=>{

drag=false;

});

});

/* CHAT */

document.addEventListener("DOMContentLoaded",()=>{

const chatBox=document.getElementById("chatBox");

if(!chatBox) return;

/* INPUTS */

const usernameInput=
document.getElementById("usernameInput");

const pfpInput=
document.getElementById("pfpInput");

const bioInput=
document.getElementById("bioInput");

const colorInput=
document.getElementById("colorInput");

const chatInput=
document.getElementById("chatInput");

const chatSend=
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

if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}

const db=firebase.database();

/* SEND */

function sendMessage(){

const text=chatInput.value.trim();

if(!text) return;

db.ref("messages").push({

username:
usernameInput.value || "anon",

pfp:
pfpInput.value || "",

bio:
bioInput.value || "",

color:
colorInput.value || "#ff4fd8",

text:text,

time:Date.now()

});

chatInput.value="";

}

chatSend.addEventListener(
"click",
sendMessage
);

chatInput.addEventListener(
"keydown",
e=>{

if(e.key==="Enter"){
sendMessage();
}

});

/* RECEIVE */

db.ref("messages")
.limitToLast(100)
.on("child_added",snap=>{

const data=snap.val();

const div=
document.createElement("div");

div.className="chat-message";

div.innerHTML=`

<img
class="chat-pfp"
src="${data.pfp || 'https://i.imgur.com/8Km9tLL.png'}">

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
opacity:0.7;
font-size:12px;
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

chatBox.scrollTop=
chatBox.scrollHeight;

});

});
