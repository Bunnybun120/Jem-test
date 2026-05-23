function openWindow(id){

document.getElementById(id)
.style.display = "flex";

}

function closeWindow(id){

document.getElementById(id)
.style.display = "none";

}

function updateClock(){

const now = new Date();

const time =
now.toLocaleTimeString([],{

hour:'2-digit',
minute:'2-digit'

});

document.getElementById(
'clock'
).innerText = time;

document.getElementById(
'taskbarClock'
).innerText = time;

}

setInterval(updateClock,1000);

updateClock();
