const playBtn =
document.getElementById(
"playBtn"
);

const pauseBtn =
document.getElementById(
"pauseBtn"
);

const player =
document.getElementById(
"youtubePlayer"
);

playBtn.onclick = ()=>{

const url =
document.getElementById(
"youtubeInput"
).value;

if(!url){

alert(
"paste a youtube url"
);

return;

}

let videoId = "";

/* NORMAL YOUTUBE */

if(url.includes("watch?v=")){

videoId =
url.split("watch?v=")[1]
.split("&")[0];

}

/* SHORT LINKS */

if(url.includes("youtu.be/")){

videoId =
url.split("youtu.be/")[1]
.split("?")[0];

}

if(videoId === ""){

alert(
"invalid youtube link"
);

return;

}

player.src =

`https://www.youtube.com/embed/${videoId}?autoplay=1`;

document.getElementById(
"trackTitle"
).innerText =

"NOW PLAYING";

};

pauseBtn.onclick = ()=>{

player.src = "";

document.getElementById(
"trackTitle"
).innerText =

"STOPPED";

};
