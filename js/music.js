window.addEventListener(
"DOMContentLoaded",
() => {

const button =

document.getElementById(
"loadMusic"
);

button.addEventListener(
"click",
loadMusic
);

}
);

function loadMusic(){

const input =

document.getElementById(
"musicInput"
).value;

const frame =

document.getElementById(
"musicFrame"
);

const status =

document.querySelector(
".music-status"
);

if(!input){

status.innerText =
"No link detected.";

return;

}

/* ===================================== */
/* YOUTUBE */
/* ===================================== */

if(
input.includes("youtube.com")
||
input.includes("youtu.be")
){

let videoId = "";

if(input.includes("watch?v=")){

videoId =
input.split("watch?v=")[1];

}

else if(input.includes("youtu.be/")){

videoId =
input.split("youtu.be/")[1];

}

if(videoId.includes("&")){

videoId =
videoId.split("&")[0];

}

frame.src =

`https://www.youtube.com/embed/${videoId}?autoplay=1`;

status.innerText =
"YouTube transmission loaded.";

}

/* ===================================== */
/* SPOTIFY */
/* ===================================== */

else if(
input.includes("spotify.com")
){

const embedLink =

input.replace(
"open.spotify.com",
"open.spotify.com/embed"
);

frame.src = embedLink;

status.innerText =
"Spotify signal connected.";

}

/* ===================================== */
/* SOUNDCLOUD */
/* ===================================== */

else if(
input.includes("soundcloud.com")
){

frame.src =

`https://w.soundcloud.com/player/?url=${encodeURIComponent(input)}`;

status.innerText =
"SoundCloud frequency connected.";

}

/* ===================================== */
/* INVALID */
/* ===================================== */

else{

status.innerText =
"Unknown transmission format.";

}

}
