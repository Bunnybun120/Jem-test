/* =========================================
LOAD WINDOWS
========================================= */

async function loadWindows(){

const response =
await fetch(
"data/siteData.json"
);

const data =
await response.json();

const desktop =
document.getElementById(
"desktop"
);

desktop.innerHTML = "";

/* WINDOWS */

data.windows.forEach(windowData=>{

const div =
document.createElement("div");

div.className =
"desktop-window";

div.innerHTML = `

<h2>

${windowData.icon}
${windowData.title}

</h2>

<div class="window-content">

<p contenteditable="false">

${windowData.content}

</p>

</div>

`;

desktop.appendChild(div);

});

/* FRIENDS */

data.friends.forEach(friend=>{

const friendDiv =
document.createElement("div");

friendDiv.className =
"desktop-window";

friendDiv.innerHTML = `

<img
src="${friend.image}"
class="friend-pfp">

<h3>

${friend.name}

</h3>

`;

friendDiv.onclick = ()=>{

openFriend(friend);

};

desktop.appendChild(friendDiv);

});

}

loadWindows();

/* =========================================
FRIEND MODAL
========================================= */

function openFriend(friend){

document.getElementById(
"friendModal"
).style.display = "flex";

document.getElementById(
"friendImage"
).src =
friend.image;

document.getElementById(
"friendName"
).innerText =
friend.name;

document.getElementById(
"friendBio"
).innerText =
friend.bio;

document.getElementById(
"friendSocial"
).href =
friend.social;

}

document.getElementById(
"closeFriend"
).onclick = ()=>{

document.getElementById(
"friendModal"
).style.display = "none";

};

/* =========================================
EDIT MODE
========================================= */

let editMode = false;

function toggleEditMode(){

editMode = !editMode;

document
.querySelectorAll(
".window-content p"
)
.forEach(item=>{

item.contentEditable =
editMode;

});

}

document.getElementById(
"toggleEdit"
).onclick =
toggleEditMode;

document.getElementById(
"mobileEditButton"
).onclick =
toggleEditMode;

/* =========================================
SAVE
========================================= */

function saveEdits(){

localStorage.setItem(
"desktopHTML",
document.getElementById(
"desktop"
).innerHTML
);

alert(
"site saved locally"
);

}

document.getElementById(
"saveLayout"
).onclick =
saveEdits;

document.getElementById(
"mobileSaveButton"
).onclick =
saveEdits;

/* =========================================
LOAD SAVED
========================================= */

window.addEventListener(
"load",
()=>{

const saved =
localStorage.getItem(
"desktopHTML"
);

if(saved){

document.getElementById(
"desktop"
).innerHTML =
saved;

}

});

/* =========================================
THEMES
========================================= */

function setTheme(theme){

document.getElementById(
"themeStylesheet"
).href =

`themes/${theme}.css`;

}

document.getElementById(
"themeVapor"
).onclick = ()=>{

setTheme("vaporwave");

};

document.getElementById(
"themeRosalina"
).onclick = ()=>{

setTheme("rosalina");

};

document.getElementById(
"themeAero"
).onclick = ()=>{

setTheme("aero");

};

/* =========================================
ADMIN PANEL
========================================= */

document.getElementById(
"adminOpen"
).onclick = ()=>{

document.getElementById(
"adminPanel"
).style.display = "block";

};

document.getElementById(
"adminLogin"
).onclick = ()=>{

const pass =
document.getElementById(
"adminPassword"
).value;

if(
pass ===
"YOURPASSWORD"
){

alert(
"admin enabled"
);

}else{

alert(
"wrong password"
);

}

};

/* =========================================
CLOCK
========================================= */

function updateClock(){

const now =
new Date();

document.getElementById(
"taskbarClock"
).innerText =

now.toLocaleTimeString();

}

setInterval(
updateClock,
1000
);

updateClock();
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

if(!videoID){

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
