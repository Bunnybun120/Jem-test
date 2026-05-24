const loadSong =
document.getElementById(
"loadSong"
);

loadSong.onclick = ()=>{

const link =
document.getElementById(
"youtubeLink"
).value;

document.getElementById(
"youtubeContainer"
).innerHTML = `

<iframe
width="100%"
height="300"
src="${link}"
frameborder="0"
allowfullscreen>

</iframe>

`;

};
