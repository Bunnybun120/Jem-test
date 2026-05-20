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

const typingIndicator = document.getElementById("typingIndicator");
const userList = document.getElementById("userList");
const chatStatus = document.getElementById("chatStatus");

/* FIREBASE CONFIG */
const firebaseConfig = {
apiKey: "AIzaSyAQkx8r6WwtLAjFfFSmlGEOTcCFvWb7hWI",
authDomain: "chatroom-39c7a.firebaseapp.com",
databaseURL: "https://chatroom-39c7a-default-rtdb.firebaseio.com",
projectId: "chatroom-39c7a",
storageBucket: "chatroom-39c7a.firebasestorage.app",
messagingSenderId: "590743257861",
appId: "1:590743257861:web:e386928c084ba704ca2d6c"
};

if(!window.__fb){
firebase.initializeApp(firebaseConfig);
window.__fb = true;
}

const db = firebase.database();

/* USER ID */
const uid = Math.random().toString(36).substring(2);

/* STATUS */
chatStatus.innerText = "● online";
chatStatus.style.color = "lime";

/* PRESENCE SYSTEM */
function setOnline(){

db.ref("users/" + uid).set({
name: usernameInput.value || "anon",
color: colorInput.value || "#ff69b4",
online: true
});

db.ref("users/" + uid).onDisconnect().remove();
}

usernameInput.addEventListener("input", setOnline);

/* USERS LIST */
db.ref("users").on("value", snap => {

userList.innerHTML = "";

snap.forEach(child => {

const u = child.val();

const div = document.createElement("div");
div.className = "user";
div.style.color = u.color || "#fff";
div.innerText = u.name || "anon";

userList.appendChild(div);

});

});

/* TYPING SYSTEM */
let typingTimeout;

chatInput.addEventListener("input", () => {

db.ref("typing/" + uid).set({
name: usernameInput.value || "anon"
});

clearTimeout(typingTimeout);

typingTimeout = setTimeout(() => {
db.ref("typing/" + uid).remove();
}, 1000);

});

/* SHOW TYPING */
db.ref("typing").on("value", snap => {

let names = [];

snap.forEach(u => {
names.push(u.val().name);
});

typingIndicator.innerText =
names.length ? `${names.join(", ")} typing...` : "";

});

/* SEND MESSAGE */
function send(){

const text = chatInput.value.trim();
if(!text) return;

db.ref("messages").push({
name: usernameInput.value || "anon",
color: colorInput.value || "#ff69b4",
text,
time: Date.now()
});

chatInput.value = "";
db.ref("typing/" + uid).remove();
}

chatSend.onclick = send;

chatInput.addEventListener("keydown", e=>{
if(e.key === "Enter") send();
});

/* RECEIVE MESSAGES */
db.ref("messages")
.limitToLast(100)
.on("child_added", snap => {

const d = snap.val();
if(!d) return;

const time = new Date(d.time).toLocaleTimeString();

const msg = document.createElement("div");
msg.className = "chat-message";

msg.innerHTML = `
<span class="chat-user" style="color:${d.color}">
${d.name}
</span>
<span>: ${d.text}</span>
<span style="font-size:10px;opacity:0.5"> ${time}</span>
`;

chatBox.appendChild(msg);
chatBox.scrollTop = chatBox.scrollHeight;

});
