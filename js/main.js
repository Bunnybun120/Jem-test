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
