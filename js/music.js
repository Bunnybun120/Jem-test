function loadSong(){

const input =

document.getElementById(
"youtubeInput"
).value;

if(!input) return;

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

document.getElementById(
"songTitle"
).innerText =
"NOW PLAYING :: " + videoId;

document.getElementById(
"youtubeEmbed"
).innerHTML =

`
<iframe
width="0"
height="0"
src="https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1"
allow="autoplay"
>
</iframe>
`;

}
