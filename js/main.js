document.addEventListener("DOMContentLoaded", () => {

/* =========================
SNAP DRAG SYSTEM (OS v2)
========================= */

const grid = 20;

document.querySelectorAll(".draggable").forEach(win => {

const bar = win.querySelector(".titlebar");
if(!bar) return;

let drag = false;
let ox = 0;
let oy = 0;

bar.addEventListener("mousedown", e => {

drag = true;

ox = e.clientX - win.offsetLeft;
oy = e.clientY - win.offsetTop;

win.style.zIndex = 9999;

});

document.addEventListener("mousemove", e => {

if(!drag) return;

let x = e.clientX - ox;
let y = e.clientY - oy;

/* SNAP TO GRID */
x = Math.round(x / grid) * grid;
y = Math.round(y / grid) * grid;

win.style.left = x + "px";
win.style.top = y + "px";

});

document.addEventListener("mouseup", () => drag = false);

});

/* =========================
TASKBAR SYSTEM
========================= */

const taskApps =
document.getElementById("taskApps");

document.querySelectorAll(".app").forEach(app => {

const name = app.dataset.app;

const btn = document.createElement("div");
btn.className = "task-app";
btn.innerText = name;

btn.onclick = () => {

app.style.display =
app.style.display === "none"
? "block"
: "none";

};

taskApps.appendChild(btn);

});

/* =========================
FIREBASE CHAT (SAFE v2)
========================= */

const chatBox = document.getElementById("chatBox");
if(!chatBox) return;

const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const usernameInput = document.getElementById("usernameInput");
const colorInput = document.getElementById("colorInput");

if(chatSend && typeof firebase !== "undefined"){

const config = {
apiKey: "AIzaSyAQkx8r6WwtLAjFfFSmlGEOTcCFvWb7hWI",
authDomain: "chatroom-39c7a.firebaseapp.com",
databaseURL: "https://chatroom-39c7a-default-rtdb.firebaseio.com",
projectId: "chatroom-39c7a",
storageBucket: "chatroom-39c7a.firebasestorage.app",
messagingSenderId: "590743257861",
appId: "1:590743257861:web:e386928c084ba704ca2d6c"
};

if(!window.__fb){
firebase.initializeApp(config);
window.__fb = true;
}

const db = firebase.database();

function send(){

const text = chatInput.value.trim();
if(!text) return;

db.ref("messages").push({
username: usernameInput?.value || "anon",
text,
color: colorInput?.value || "#ff69b4",
timestamp:Date.now()
});

chatInput.value = "";
}

chatSend.onclick = send;

chatInput.addEventListener("keydown", e => {
if(e.key === "Enter") send();
});

db.ref("messages")
.limitToLast(100)
.on("child_added", snap => {

const d = snap.val();

const div = document.createElement("div");
div.innerHTML = `
<span style="color:${d.color}">
${d.username}
</span>: ${d.text}
`;

chatBox.appendChild(div);
chatBox.scrollTop = chatBox.scrollHeight;

});

}

});
