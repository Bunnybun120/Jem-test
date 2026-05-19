const audio =
document.getElementById("audio");

document
.getElementById("playBtn")
.addEventListener("click", () => {audio.play();});

document
.getElementById("pauseBtn")
.addEventListener("click", () => {audio.pause();});
