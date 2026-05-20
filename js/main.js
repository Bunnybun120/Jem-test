console.log("🟢 OS SYSTEM LOADING...");

/* =========================
   WAIT FOR PAGE SAFELY
========================= */

window.addEventListener("DOMContentLoaded", () => {

  console.log("🟢 DOM READY");

  /* =========================
     GET ELEMENTS (SAFE CHECK)
  ========================= */

  const loginBox = document.getElementById("loginBox");
  const chatSystem = document.getElementById("chatSystem");

  const nameInput = document.getElementById("nameInput");
  const joinBtn = document.getElementById("joinBtn");

  const chatBox = document.getElementById("chatBox");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");

  /* =========================
     DEBUG CHECKS (IMPORTANT)
  ========================= */

  if (!joinBtn) {
    console.error("❌ joinBtn not found — check HTML ID");
    return;
  }

  if (!nameInput) {
    console.error("❌ nameInput not found — check HTML ID");
    return;
  }

  console.log("🟢 Chat elements loaded");

  /* =========================
     FIREBASE INIT
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

  if (typeof firebase === "undefined") {
    console.error("❌ Firebase not loaded");
    return;
  }

  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  const messages = db.ref("chat/messages");
  const users = db.ref("chat/users");

  /* =========================
     STATE
  ========================= */

  let username = "";
  let color = "#ff69b4";

  /* =========================
     JOIN BUTTON (FIXED)
  ========================= */

  joinBtn.addEventListener("click", () => {

    console.log("🟢 JOIN CLICKED");

    username = nameInput.value.trim();

    if (!username) {
      alert("Enter a username");
      return;
    }

    loginBox.style.display = "none";
    chatSystem.style.display = "block";

    users.push({
      name: username,
      time: Date.now()
    });

    console.log("🟢 USER JOINED:", username);

  });

  /* =========================
     SEND MESSAGE
  ========================= */

  function sendMessage() {

    const msg = chatInput?.value.trim();

    if (!msg) return;
    if (!username) return;

    messages.push({
      user: username,
      text: msg,
      color: color,
      time: Date.now()
    });

    chatInput.value = "";
  }

  chatSend?.addEventListener("click", sendMessage);

  chatInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  /* =========================
     RECEIVE MESSAGES
  ========================= */

  messages.on("child_added", (snap) => {

    const d = snap.val();

    if (!chatBox) return;

    const p = document.createElement("p");

    p.innerHTML =
      `<span style="color:${d.color}">${d.user}</span>: ${d.text}`;

    chatBox.appendChild(p);

    chatBox.scrollTop = chatBox.scrollHeight;

  });

  console.log("🟢 CHAT SYSTEM READY");

});
