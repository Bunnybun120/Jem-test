document.addEventListener("DOMContentLoaded", () => {

  /* DRAG SYSTEM */
  document.querySelectorAll(".draggable").forEach(win => {

    const bar = win.querySelector(".titlebar");
    if (!bar) return;

    let dragging = false;
    let ox = 0;
    let oy = 0;

    bar.addEventListener("mousedown", e => {

      dragging = true;

      ox = e.clientX - win.offsetLeft;
      oy = e.clientY - win.offsetTop;

      win.style.position = "absolute";
      win.style.zIndex = 9999;

    });

    document.addEventListener("mousemove", e => {

      if (!dragging) return;

      win.style.left = (e.clientX - ox) + "px";
      win.style.top = (e.clientY - oy) + "px";

    });

    document.addEventListener("mouseup", () => dragging = false);

  });

});


/* =========================
   FIREBASE CHAT (SAFE)
========================= */

const firebaseConfig = {
  apiKey: "AIzaSyAQkx8r6WwtLAjFfFSmlGEOTcCFvB7hWI",
  authDomain: "chatroom-39c7a.firebaseapp.com",
  databaseURL: "https://chatroom-39c7a-default-rtdb.firebaseio.com",
  projectId: "chatroom-39c7a",
  storageBucket: "chatroom-39c7a.firebasestorage.app",
  messagingSenderId: "590743257861",
  appId: "1:590743257861:web:e386928c084ba704ca2d6c"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const messages = db.ref("chat/messages");
const users = db.ref("chat/users");

/* ELEMENTS */
const loginBox = document.getElementById("loginBox");
const chatSystem = document.getElementById("chatSystem");

const nameInput = document.getElementById("nameInput");
const joinBtn = document.getElementById("joinBtn");

const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");

const userBar = document.getElementById("userBar");

/* USER */
let username = "";
let color = "#ff69b4";

/* JOIN */
joinBtn.onclick = () => {

  username = nameInput.value.trim();
  if (!username) return;

  loginBox.style.display = "none";
  chatSystem.style.display = "block";

  users.push({ name: username });

};

/* SEND */
function send() {

  const msg = chatInput.value.trim();
  if (!msg || !username) return;

  messages.push({
    user: username,
    text: msg,
    color: color
  });

  chatInput.value = "";
}

chatSend.onclick = send;

chatInput.addEventListener("keydown", e => {
  if (e.key === "Enter") send();
});

/* RECEIVE */
messages.on("child_added", snap => {

  const d = snap.val();

  const p = document.createElement("p");
  p.innerHTML = `<span style="color:${d.color}">${d.user}</span>: ${d.text}`;

  chatBox.appendChild(p);

  chatBox.scrollTop = chatBox.scrollHeight;

});
