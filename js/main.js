document.addEventListener("DOMContentLoaded",()=>{

/* DRAG */

document.querySelectorAll(".draggable")
.forEach(win=>{

const bar=win.querySelector(".titlebar");

let drag=false;
let ox=0;
let oy=0;

bar.addEventListener("mousedown",e=>{

drag=true;

ox=e.clientX-win.offsetLeft;
oy=e.clientY-win.offsetTop;

});

document.addEventListener("mousemove",e=>{

if(!drag) return;

win.style.left=
(e.clientX-ox)+"px";

win.style.top=
(e.clientY-oy)+"px";

});

document.addEventListener("mouseup",()=>{

drag=false;

});

});

/* CATEGORY */

document.querySelectorAll(".category-header")
.forEach(header=>{

header.addEventListener("click",()=>{

const content=
header.nextElementSibling;

content.style.display=
content.style.display==="block"
? "none"
: "block";

});

});

/* STATUS */

const status=
document.getElementById("statusPanel");

if(status){

let mood=0;

status.addEventListener("click",()=>{

mood++;

if(mood===1)
status.innerText=
"STATUS :: IDLE";

if(mood===2)
status.innerText=
"STATUS :: FOCUSED";

if(mood===3)
status.innerText=
"STATUS :: OVERLOADED";

if(mood===4){

status.innerText=
"STATUS :: ONLINE ✦";

mood=0;

}

});

}

/* TYPE */

const type=
document.getElementById("typeLine");

if(type){

const text=
"booting profile system...";

let i=0;

function write(){

if(i<text.length){

type.innerHTML+=
text.charAt(i);

i++;

setTimeout(write,40);

}

}

write();

}

});
