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

document.addEventListener("DOMContentLoaded", () => {

const chatBox = document.getElementById("chatBox");
if(!chatBox) return; // prevents breaking other pages

const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const usernameInput = document.getElementById("usernameInput");
const colorInput = document.getElementById("colorInput");

if(!chatInput || !chatSend || !usernameInput){
console.warn("Chat missing elements");
return;
}

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

chatSend.onclick = sendMessage;

chatInput.addEventListener("keydown", e=>{
if(e.key === "Enter") sendMessage();
});

db.ref("messages")
.limitToLast(100)
.on("child_added", snap=>{

const d = snap.val();
if(!d) return;

const msg = document.createElement("div");
msg.className = "chat-message";

msg.innerHTML = `
<span style="color:${d.color}">
${d.username}
</span>: ${d.text}
`;

chatBox.appendChild(msg);
chatBox.scrollTop = chatBox.scrollHeight;

});

});
