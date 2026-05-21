document.addEventListener("DOMContentLoaded",()=>{

/* =========================================
BOOT SCREEN
========================================= */

setTimeout(()=>{

const boot =
document.getElementById("bootScreen");

if(boot){

boot.style.display = "none";

}

},3000);

/* =========================================
YOUTUBE MUSIC SYSTEM
========================================= */

let player;
let musicPlaying = false;

const musicToggle =
document.getElementById("musicToggle");

const musicURL =
document.getElementById("musicURL");

const volumeSlider =
document.getElementById("volumeSlider");

/* LOAD SAVED MUSIC */

if(musicURL){

musicURL.value =
localStorage.getItem("site_music") || "";

}

/* GET VIDEO ID */

function getYoutubeID(url){

const regExp =
/(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&]+)/;

const match =
url.match(regExp);

return match ? match[1] : null;

}

/* YOUTUBE PLAYER */

window.onYouTubeIframeAPIReady =
function(){

player = new YT.Player(
"youtubePlayer",
{

height:"0",
width:"0",

videoId:"",

playerVars:{
autoplay:0,
controls:0,
loop:1
},

events:{

onReady:()=>{

const savedURL =
localStorage.getItem("site_music");

if(savedURL){

const id =
getYoutubeID(savedURL);

if(id){

player.loadVideoById(id);

player.setVolume(40);

musicPlaying = true;

if(musicToggle){

musicToggle.innerText =
"❚❚";

}

}

}

}

}

});

};

/* PLAY / PAUSE */

if(musicToggle){

musicToggle.addEventListener("click",()=>{

const url =
musicURL.value.trim();

if(!url) return;

localStorage.setItem(
"site_music",
url
);

const id =
getYoutubeID(url);

if(!id){

alert("Invalid YouTube URL.");

return;

}

if(!musicPlaying){

player.loadVideoById(id);

musicPlaying = true;

musicToggle.innerText =
"❚❚";

}else{

player.pauseVideo();

musicPlaying = false;

musicToggle.innerText =
"▶";

}

});

}

/* VOLUME */

if(volumeSlider){

volumeSlider.addEventListener(
"input",
()=>{

if(player){

player.setVolume(
volumeSlider.value
);

}

});

}

/* =========================================
CHATROOM SYSTEM
========================================= */

const chatBox =
document.getElementById("chatBox");

if(chatBox){

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

/* =========================================
LOAD SAVED PROFILE
========================================= */

usernameInput.value =
localStorage.getItem("chat_username") || "";

pfpInput.value =
localStorage.getItem("chat_pfp") || "";

bioInput.value =
localStorage.getItem("chat_bio") || "";

colorInput.value =
localStorage.getItem("chat_color") || "#ff4fd8";

/* =========================================
SAVE PROFILE
========================================= */

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

/* =========================================
FIREBASE
========================================= */

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

firebase.initializeApp(
firebaseConfig
);

}

const db =
firebase.database();

/* =========================================
SEND MESSAGE
========================================= */

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

chatInput.value = "";

})
.catch(err=>{

console.error(err);

alert(
"Message failed to send."
);

});

}

/* SEND BUTTON */

chatSend.addEventListener(
"click",
sendMessage
);

/* ENTER TO SEND */

chatInput.addEventListener(
"keydown",
e=>{

if(e.key==="Enter"){

sendMessage();

}

});

/* =========================================
RENDER MESSAGE
========================================= */

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

div.className =
"chat-message";

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

/* =========================================
LIVE MESSAGES
========================================= */

db.ref("messages")
.limitToLast(100)
.on("child_added",snapshot=>{

const data =
snapshot.val();

renderMessage(data);

});

/* =========================================
ARCHIVE CHAT
========================================= */

archiveChat.addEventListener(
"click",
()=>{

db.ref("messages")
.once("value",(snapshot)=>{

const messages =
snapshot.val();

if(!messages){

alert(
"No messages to archive."
);

return;

}

const archiveId =
"archive_" + Date.now();

db.ref(
"archives/" + archiveId
)
.set(messages)
.then(()=>{

db.ref("messages")
.remove();

chatBox.innerHTML = "";

alert(
"Chat archived."
);

});

});

});

/* =========================================
VIEW ARCHIVES
========================================= */

viewArchives.addEventListener(
"click",
()=>{

archiveModal.style.display =
"flex";

archiveList.innerHTML = "";

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

div.addEventListener(
"click",
()=>{

chatBox.innerHTML = "";

const archiveMessages =
archives[key];

Object.values(
archiveMessages
).forEach(data=>{

renderMessage(data);

});

archiveModal.style.display =
"none";

});

archiveList.appendChild(div);

});

});

});

/* =========================================
CLOSE ARCHIVES
========================================= */

closeArchives.addEventListener(
"click",
()=>{

archiveModal.style.display =
"none";

});

}

/* =========================================
RETRO UI SOUND EFFECTS
========================================= */

const buttons =
document.querySelectorAll("button");

buttons.forEach(button=>{

button.addEventListener(
"mouseenter",
()=>{

const hover =
new Audio(
"https://files.catbox.moe/8lq9k2.mp3"
);

hover.volume = 0.15;

hover.play();

});

});

/* =========================================
WINDOW OPEN EFFECT
========================================= */

const windows =
document.querySelectorAll(
".desktop-app"
);

windows.forEach((win,index)=>{

win.style.animationDelay =
`${index * 0.05}s`;

});

});
