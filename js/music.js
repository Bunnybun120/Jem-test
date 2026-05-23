const audio =
document.getElementById(
"audioPlayer"
);

const playButton =
document.getElementById(
"playButton"
);

const pauseButton =
document.getElementById(
"pauseButton"
);

playButton.onclick = ()=>{

audio.play();

};

pauseButton.onclick = ()=>{

audio.pause();

};
