document.addEventListener("DOMContentLoaded", () => {

/* DRAG SYSTEM */
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
win.style.left = (e.clientX - ox) + "px";
win.style.top = (e.clientY - oy) + "px";
});

document.addEventListener("mouseup", () => drag = false);

});

/* CHAT SYSTEM ONLY RUNS IF EXISTS */
const chatBox = document.getElementById("chatBox");
if(!chatBox) return;

const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const usernameInput = document.getElementById("usernameInput");
const colorInput = document.getElementById("colorInput");
const colorPreset = document.getElementById("colorPreset");

if(!chatInput || !chatSend || !usernameInput) return;

/* Firebase config */
const firebaseConfig = {
apiKey: "AIzaSyAQkx8r6WwtLAjFfFSmlGEOTcCFvWb7hWI",
authDomain: "chatroom-39c7a.firebaseapp.com",
databaseURL: "https://chatroom-39c7a-default-rtdb.firebaseio.com",
projectId: "chatroom-39c7a",
storageBucket: "chatroom-39c7a.firebasestorage.app",
messagingSenderId: "590743257861",
appId: "1:590743257861:web:e386928c084ba704ca2d6c"
};

if(!window._firebaseInit){
firebase.initializeApp(firebaseConfig);
window._firebaseInit = true;
}

const db = firebase.database();

/* color sync */
if(colorPreset && colorInput){
colorPreset.addEventListener("change", () => {
colorInput.value = colorPreset.value;
});
}

/* send message */
function sendMessage(){

const text = chatInput.value.trim();
const user = usernameInput.value.trim() || "anon";
const color = (colorInput && colorInput.value) || "#ff69b4";

if(!text) return;

db.ref("messages").push({
username:user,
text:text,
color:color,
timestamp:Date.now()
});

chatInput.value = "";
}

chatSend.addEventListener("click", sendMessage);

chatInput.addEventListener("keydown", e => {
if(e.key === "Enter") sendMessage();
});

/* receive */
db.ref("messages")
.limitToLast(100)
.on("child_added", snap => {

const d = snap.val();
if(!d) return;

const msg = document.createElement("div");
msg.className = "chat-message";

msg.innerHTML = `
<span class="chat-user" style="color:${d.color}">
${d.username || "anon"}
</span>: ${d.text || ""}
`;

chatBox.appendChild(msg);
chatBox.scrollTop = chatBox.scrollHeight;

});

});
