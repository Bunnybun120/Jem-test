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

let ytPlayer = null;

let ytReady = false;

let musicLoaded = false;

let currentVideoID = null;

/* =========================================
ELEMENTS
========================================= */

const musicToggle =
document.getElementById(
"musicToggle"
);

const musicURL =
document.getElementById(
"musicURL"
);

const volumeSlider =
document.getElementById(
"volumeSlider"
);
const nowPlaying =
document.getElementById(
"nowPlaying"
);
/* =========================================
SAFE PAGE CHECK
========================================= */

const musicSystemExists =

musicToggle &&
musicURL &&
volumeSlider;

/* =========================================
GET VIDEO ID
========================================= */

function getYoutubeVideoID(url){
/* =========================================
NOW PLAYING
========================================= */

async function updateNowPlaying(videoID){

if(!nowPlaying) return;

try{

const response =
await fetch(

`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoID}`

);

const data =
await response.json();

if(data.title){

nowPlaying.innerText =

"NOW PLAYING :: " +
data.title;

}else{

nowPlaying.innerText =

"NOW PLAYING :: unknown track";

}

}catch{

nowPlaying.innerText =

"NOW PLAYING :: unable to load";

}

}
try{

const parsed =
new URL(url);

if(
parsed.hostname.includes(
"youtu.be"
)
){

return parsed.pathname.slice(1);

}

if(
parsed.searchParams.get("v")
){

return parsed.searchParams.get("v");

}

return null;

}catch{

return null;

}

}

/* =========================================
YOUTUBE API READY
========================================= */

window.onYouTubeIframeAPIReady =
function(){

if(
!document.getElementById(
"youtubePlayer"
)
){

return;

}

ytPlayer =
new YT.Player(
"youtubePlayer",
{

height:"0",
width:"0",

videoId:"",

playerVars:{

autoplay:0,
controls:0,
disablekb:1,
fs:0,
modestbranding:1

},

events:{

onReady:()=>{

ytReady = true;

console.log(
"YouTube player ready"
);

/* LOAD SAVED URL */

const savedURL =
localStorage.getItem(
"site_music_url"
);

if(
savedURL &&
musicURL
){

musicURL.value =
savedURL;

}

},

onStateChange:(event)=>{

if(
event.data ===
YT.PlayerState.PLAYING
){

musicLoaded = true;

if(musicToggle){

musicToggle.innerText =
"PAUSE";

}

}

if(
event.data ===
YT.PlayerState.PAUSED
){

if(musicToggle){

musicToggle.innerText =
"PLAY";

}

}

}

}

});

};

/* =========================================
PLAY MUSIC
========================================= */

function playMusic(){

if(
!musicSystemExists
){

return;

}

if(
!ytReady ||
!ytPlayer
){

alert(
"Music system still loading..."
);

return;

}

const url =
musicURL.value.trim();

if(!url){

alert(
"Paste a YouTube link."
);

return;

}

const videoID =
getYoutubeVideoID(url);

updateNowPlaying(
videoID
);
if(!videoID){
/
}
alert(
"Invalid YouTube link."
);

return;

}

/* SAVE URL */

localStorage.setItem(
"site_music_url",
url
);

/* LOAD NEW SONG */

if(
currentVideoID !== videoID
){

ytPlayer.loadVideoById(
videoID
);

currentVideoID =
videoID;

}else{

ytPlayer.playVideo();

}

/* VOLUME */

ytPlayer.setVolume(
volumeSlider.value
);

musicLoaded = true;

musicToggle.innerText =
"PAUSE";

}

/* =========================================
PAUSE MUSIC
========================================= */

function pauseMusic(){

if(
ytPlayer &&
musicLoaded
){

ytPlayer.pauseVideo();

musicToggle.innerText =
"PLAY";

}

}

/* =========================================
BUTTON
========================================= */

if(
musicSystemExists
){

musicToggle.addEventListener(
"click",
()=>{

if(
!musicLoaded
){

playMusic();

return;

}

const state =
ytPlayer.getPlayerState();

/* PLAY */

if(
state !==
YT.PlayerState.PLAYING
){

ytPlayer.playVideo();

musicToggle.innerText =
"PAUSE";

}

/* PAUSE */

else{

pauseMusic();

}

});

}

/* =========================================
ENTER KEY
========================================= */

if(musicURL){

musicURL.addEventListener(
"keydown",
(e)=>{

if(
e.key === "Enter"
){

playMusic();

}

});

}

/* =========================================
VOLUME
========================================= */

if(volumeSlider){

volumeSlider.addEventListener(
"input",
()=>{

if(ytPlayer){

ytPlayer.setVolume(
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
/* =========================================
TASKBAR CLOCK
========================================= */

const taskbarClock =
document.getElementById(
"taskbarClock"
);

if(taskbarClock){

function updateClock(){

const now =
new Date();

taskbarClock.innerText =
now.toLocaleTimeString([],{

hour:"2-digit",
minute:"2-digit"

});

}

updateClock();

setInterval(
updateClock,
1000
);

}

/* =========================================
PARTICLES
========================================= */

const particles =
document.querySelector(
".particles"
);

if(particles){

for(let i=0;i<45;i++){

const particle =
document.createElement("div");

particle.className =
"particle";

particle.style.left =
Math.random() * 100 + "%";

particle.style.animationDuration =
(8 + Math.random() * 12) + "s";

particle.style.animationDelay =
Math.random() * 8 + "s";

particles.appendChild(
particle
);

}

}
/* =========================================
LOAD SITE CONTENT
========================================= */

async function loadDesktopApps(){

const response =
await fetch(
"data/data.json"
);

const data =
await response.json();

const desktop =
document.getElementById(
"desktopContainer"
);

desktop.innerHTML = "";

/* LOOP */

Object.entries(data)
.forEach(([key,value])=>{

const windowDiv =
document.createElement("div");

windowDiv.className =
"desktop-app";

windowDiv.innerHTML = `

<div class="app-icon">
💖
</div>

<div class="app-name">
${value.title}
</div>

<p>
${value.content}
</p>

`;

desktop.appendChild(
windowDiv
);

});

}

loadDesktopApps();
/* =========================================
EDIT MODE
========================================= */

let editMode = false;

function toggleEditMode(){

editMode = !editMode;

document.body.classList.toggle(
"editing"
);

const apps =
document.querySelectorAll(
".desktop-app p"
);

apps.forEach(app=>{

app.contentEditable =
editMode;

});

}

document.addEventListener(
"keydown",
(e)=>{

if(
e.ctrlKey &&
e.key === "e"
){

toggleEditMode();

}

});
