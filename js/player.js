const playBtn =
document.getElementById(
"playBtn"
);

const pauseBtn =
document.getElementById(
"pauseBtn"
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

document.getElementById(
"trackTitle"
).innerText =

"NOW PLAYING";

window.open(
url,
"_blank"
);

};

pauseBtn.onclick = ()=>{

document.getElementById(
"trackTitle"
).innerText =

"STOPPED";

};
