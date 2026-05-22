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

data.windows.forEach(windowData=>{

const div =
document.createElement("div");

div.className =
"desktop-window";

div.innerHTML = `

<div class="window-header">

${windowData.icon}
${windowData.title}

</div>

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

friendDiv.addEventListener(
"click",
()=>{

openFriend(friend);

});

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
THEMES
========================================= */

document.getElementById(
"themeRosalina"
).onclick = ()=>{

document.documentElement
.style.setProperty(
"--bg",
"#7ecbff"
);

document.documentElement
.style.setProperty(
"--accent",
"#bfe9ff"
);

};

document.getElementById(
"themeAero"
).onclick = ()=>{

document.documentElement
.style.setProperty(
"--bg",
"#8fd3ff"
);

document.documentElement
.style.setProperty(
"--accent",
"#ffffff"
);

};

document.getElementById(
"themeVapor"
).onclick = ()=>{

document.documentElement
.style.setProperty(
"--bg",
"#120018"
);

document.documentElement
.style.setProperty(
"--accent",
"#ff4fd8"
);

};
