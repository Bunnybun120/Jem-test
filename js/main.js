document.addEventListener("DOMContentLoaded", () => {

/* =========================
SAFE DRAG SYSTEM (NO CRASHES)
========================= */

document.querySelectorAll(".draggable").forEach(win => {

const bar = win.querySelector(".titlebar");
if(!bar) return;

let dragging = false;
let offsetX = 0;
let offsetY = 0;

bar.addEventListener("mousedown", e => {
dragging = true;
offsetX = e.clientX - win.offsetLeft;
offsetY = e.clientY - win.offsetTop;
win.style.zIndex = 9999;
});

document.addEventListener("mousemove", e => {
if(!dragging) return;

win.style.left = (e.clientX - offsetX) + "px";
win.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", () => dragging = false);

});

/* =========================
CHAT SYSTEM (ONLY RUN IF EXISTS)
========================= */

const chatBox = document.getElementById("chatBox");

/* STOP ENTIRE CHAT CODE IF NOT CHAT PAGE */
if(!chatBox) return;

const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const usernameInput = document.getElementById("usernameInput");
const colorInput = document.getElementById("colorInput");

/* EXTRA SAFETY */
if(!chatInput || !chatSend || !usernameInput){
console.warn("Chat missing elements");
return;
}

/* =========================
FIREBASE SAFE INIT (NO DOUBLE LOAD)
========================= */

const firebaseConfig = {
apiKey: "AIzaSyAQkx8r6WwtLAjFfFSmlGEOTcCFvWb7hWI",
authDomain: "chatroom-39c7a.firebaseapp.com",
databaseURL: "https://chatroom-39c7a-default-rtdb.firebaseio.com",
projectId: "chatroom-39c7a",
storageBucket: "chatroom-39c7a.firebasestorage.app",
messagingSenderId: "590743257861",
appId: "1:590743257861:web:e386928c084ba704ca2d6c"
};

if(!window.__FIREBASE_INIT__){
firebase.initializeApp(firebaseConfig);
window.__FIREBASE_INIT__ = true;
}

const db = firebase.database();

/* =========================
SEND MESSAGE (FIXED)
========================= */

function sendMessage(){

const text = chatInput.value.trim();
if(!text) return;

db.ref("messages").push({
username: usernameInput.value || "anon",
text,
color: colorInput?.value || "#ff69b4",
time: Date.now()
});

chatInput.value = "";
}

chatSend.addEventListener("click", sendMessage);

chatInput.addEventListener("keydown", e => {
if(e.key === "Enter") sendMessage();
});

/* =========================
RECEIVE MESSAGES
========================= */

db.ref("messages")
.limitToLast(100)
.on("child_added", snap => {

const d = snap.val();
if(!d) return;

const msg = document.createElement("div");
msg.className = "chat-message";

msg.innerHTML = `
<span class="chat-user" style="color:${d.color}">
${d.username}
</span>: ${d.text}
`;

chatBox.appendChild(msg);
chatBox.scrollTop = chatBox.scrollHeight;

});

});
