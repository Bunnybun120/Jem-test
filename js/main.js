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
YOUTUBE MUSIC
========================================= */

let player;
let musicPlaying = false;

const musicToggle =
document.getElementById("musicToggle");

const musicURL =
document.getElementById("musicURL");

const volumeSlider =
document.getElementById("volumeSlider");

/* LOAD SAVED */

if(musicURL){

musicURL.value =
localStorage.getItem("site_music") || "";

}

/* GET ID */

function getYoutubeID(url){

const regExp =
/(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&]+)/;

const match =
url.match(regExp);

return match ? match[1] : null;

}

/* YOUTUBE */

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
controls:0
},

events:{

onReady:()=>{

const saved =
localStorage.getItem("site_music");

if(saved){

const id =
getYoutubeID(saved);

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

/* PLAY */

if(musicToggle){

musicToggle.addEventListener(
"click",
()=>{

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

alert("Invalid URL.");

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
CHATROOM
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

const clearChat =
document.getElementById("clearChat");

const archiveModal =
document.getElementById("archiveModal");

const archiveList =
document.getElementById("archiveList");

const closeArchives =
document.getElementById("closeArchives");

/* =========================================
SAVE PROFILE
========================================= */

usernameInput.value =
localStorage.getItem("chat_username") || "";

pfpInput.value =
localStorage.getItem("chat_pfp") || "";

bioInput.value =
localStorage.getItem("chat_bio") || "";

colorInput.value =
localStorage.getItem("chat_color") || "#ff4fd8";

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

[
usernameInput,
pfpInput,
bioInput,
colorInput
].forEach(input=>{

input.addEventListener(
"input",
saveProfile
);

});

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

const data = {

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
.push(data)
.then(()=>{

chatInput.value = "";

})
.catch(err=>{

console.error(err);

alert(
"Message failed."
);

});

}

/* SEND */

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

/* =========================================
RENDER
========================================= */

function renderMessage(data){

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
src="${data.pfp}"
onerror="this.src='https://i.imgur.com/8Km9tLL.png'">

<div class="chat-bubble">

<div
style="
display:flex;
align-items:center;
flex-wrap:wrap;
">

<div
class="chat-username"
style="
color:${data.color};
">

${data.username}

</div>

<div class="chat-time">
${timeString}
</div>

</div>

<div class="chat-bio">
${data.bio}
</div>

<div class="chat-text">
${data.text}
</div>

</div>

`;

chatBox.appendChild(div);

chatBox.scrollTop =
chatBox.scrollHeight;

}

/* =========================================
LIVE CHAT
========================================= */

db.ref("messages")
.limitToLast(100)
.on("child_added",snapshot=>{

renderMessage(
snapshot.val()
);

});

/* =========================================
CLEAR CHAT
========================================= */

if(clearChat){

clearChat.addEventListener(
"click",
()=>{

const confirmClear =
confirm(
"Clear chat?"
);

if(!confirmClear) return;

db.ref("messages")
.remove()
.then(()=>{

chatBox.innerHTML = "";

});

});

}

/* =========================================
ARCHIVE
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
"No messages."
);

return;

}

const archiveID =
"archive_" + Date.now();

db.ref(
"archives/" + archiveID
)
.set(messages)
.then(()=>{

db.ref("messages")
.remove();

chatBox.innerHTML = "";

alert(
"Archived."
);

});

});

});

/* =========================================
VIEW LOGS
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
"<p>No archives.</p>";

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

Object.values(
archives[key]
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
CLOSE LOGS
========================================= */

closeArchives.addEventListener(
"click",
()=>{

archiveModal.style.display =
"none";

});

}

});
