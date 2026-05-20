document.addEventListener("DOMContentLoaded", () => {

/* =========================
DRAG SYSTEM
========================= */

const windows =
document.querySelectorAll(".draggable");

windows.forEach((win, index) => {

const bar =
win.querySelector(".titlebar");

if(!bar) return;

let dragging = false;
let offsetX = 0;
let offsetY = 0;

/* initial safe positioning */

if(window.innerWidth > 768){

win.style.left =
(80 + index * 60) + "px";

win.style.top =
(120 + index * 50) + "px";

}

/* drag start */

bar.addEventListener("mousedown", (e) => {

dragging = true;

offsetX = e.clientX - win.offsetLeft;
offsetY = e.clientY - win.offsetTop;

win.style.zIndex = Date.now();

});

/* drag move */

document.addEventListener("mousemove", (e) => {

if(!dragging) return;

win.style.left =
(e.clientX - offsetX) + "px";

win.style.top =
(e.clientY - offsetY) + "px";

});

/* drag stop */

document.addEventListener("mouseup", () => {

dragging = false;

});

});

/* =========================
FIREBASE CHAT (CHATROOM ONLY)
========================= */

const chatBox =
document.getElementById("chatBox");

const chatInput =
document.getElementById("chatInput");

const chatSend =
document.getElementById("chatSend");

const usernameInput =
document.getElementById("usernameInput");

const colorInput =
document.getElementById("colorInput");

const colorPreset =
document.getElementById("colorPreset");

if(chatSend && typeof firebase !== "undefined"){

const firebaseConfig = {

apiKey: "AIzaSyAQkx8r6WwtLAjFfFSmlGEOTcCFvWb7hWI",
authDomain: "chatroom-39c7a.firebaseapp.com",
databaseURL: "https://chatroom-39c7a-default-rtdb.firebaseio.com",
projectId: "chatroom-39c7a",
storageBucket: "chatroom-39c7a.firebasestorage.app",
messagingSenderId: "590743257861",
appId: "1:590743257861:web:e386928c084ba704ca2d6c"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

/* COLOR PICKER SYNC */

colorPreset.addEventListener("change", () => {
colorInput.value = colorPreset.value;
});

/* SEND MESSAGE */

function sendMessage(){

const text = chatInput.value.trim();
const username = usernameInput.value.trim() || "anon";

const color =
colorInput.value || colorPreset.value || "#ff69b4";

if(!text) return;

db.ref("messages").push({

username,
text,
color,
timestamp: Date.now()

});

chatInput.value = "";

}

chatSend.addEventListener("click", sendMessage);

chatInput.addEventListener("keydown", (e) => {
if(e.key === "Enter") sendMessage();
});

/* RECEIVE MESSAGES */

db.ref("messages")
.limitToLast(100)
.on("child_added", (snap) => {

const data = snap.val();

const msg = document.createElement("div");
msg.className = "chat-message";

msg.innerHTML = `
<span class="chat-user"
style="color:${data.color || '#ff69b4'}">
${data.username || "anon"}
</span>
: ${data.text || ""}
`;

chatBox.appendChild(msg);

chatBox.scrollTop = chatBox.scrollHeight;

});

}
/* RECEIVE MESSAGES */

db.ref("messages")
.limitToLast(100)
.on("child_added", (snap) => {

const data = snap.val();

const msg = document.createElement("div");
msg.className = "chat-message";

msg.innerHTML = `
<span class="chat-user">${data.username || "anon"}</span>
: ${data.text || ""}
`;

chatBox.appendChild(msg);

chatBox.scrollTop = chatBox.scrollHeight;

});

}

});
