document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     DRAGGABLE WINDOWS
  ========================= */

  document.querySelectorAll(".draggable").forEach(win => {

    const bar = win.querySelector(".titlebar");
    if (!bar) return;

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    bar.addEventListener("mousedown", e => {

      if (window.innerWidth < 768) return;

      dragging = true;

      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;

      win.style.zIndex = 9999;

    });

    document.addEventListener("mousemove", e => {

      if (!dragging) return;

      win.style.left = (e.clientX - offsetX) + "px";
      win.style.top = (e.clientY - offsetY) + "px";

    });

    document.addEventListener("mouseup", () => {
      dragging = false;
    });

  });

  /* =========================
     DROPDOWNS
  ========================= */

  document.querySelectorAll(".category-header").forEach(header => {

    header.addEventListener("click", () => {

      const content = header.nextElementSibling;

      if (!content) return;

      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }

    });

  });

  /* =========================
     OPTIONAL SPARKLES
  ========================= */

  document.addEventListener("mousemove", e => {

    const s = document.createElement("div");
    s.className = "sparkle";

    s.style.left = e.pageX + "px";
    s.style.top = e.pageY + "px";

    document.body.appendChild(s);

    setTimeout(() => s.remove(), 400);

  });

});


/* =======================================================
   💬 BULLETPROOF FIREBASE CHAT SYSTEM (PUT AT BOTTOM)
======================================================= */

(function () {

  const el = (id) => document.getElementById(id);

  const loginBox = el("loginBox");
  const chatSystem = el("chatSystem");

  const nameInput = el("nameInput");
  const joinBtn = el("joinBtn");

  const chatBox = el("chatBox");
  const chatInput = el("chatInput");
  const chatSend = el("chatSend");

  const typing = el("typing");
  const userBar = el("userBar");
  const status = el("chatStatus");

  function safe(msg) {
    if (status) status.innerText = msg;
  }

  if (!loginBox || !chatSystem || !chatBox) {
    safe("CHAT ERROR: missing elements");
    return;
  }

  if (typeof firebase === "undefined") {
    safe("OFFLINE MODE (Firebase not loaded)");
    loginBox.style.display = "none";
    chatSystem.style.display = "block";
    chatBox.innerHTML = "<p>offline mode</p>";
    return;
  }

  const firebaseConfig = {
    apiKey: "AIzaSyAQkx8r6WwtLAjFfFSmlGEOTcCFvB7hWI",
    authDomain: "chatroom-39c7a.firebaseapp.com",
    databaseURL: "https://chatroom-39c7a-default-rtdb.firebaseio.com",
    projectId: "chatroom-39c7a",
    storageBucket: "chatroom-39c7a.firebasestorage.app",
    messagingSenderId: "590743257861",
    appId: "1:590743257861:web:e386928c084ba704ca2d6c"
  };

  try {
    firebase.initializeApp(firebaseConfig);
  } catch (e) {}

  const db = firebase.database();

  const messagesRef = db.ref("chat/messages");
  const usersRef = db.ref("chat/users");
  const typingRef = db.ref("chat/typing");

  let username = "";
  let color = pickColor();

  function pickColor() {
    const c = ["#ff69b4","#00ffff","#8a2be2","#7fff00","#ffcc00"];
    return c[Math.floor(Math.random() * c.length)];
  }

  joinBtn?.addEventListener("click", () => {

    username = nameInput?.value?.trim();

    if (!username) return;

    loginBox.style.display = "none";
    chatSystem.style.display = "block";

    usersRef.push({
      name: username,
      time: Date.now()
    });

  });

  function send() {

    const msg = chatInput?.value?.trim();
    if (!msg || !username) return;

    messagesRef.push({
      user: username,
      text: msg,
      color: color,
      time: Date.now()
    });

    chatInput.value = "";
  }

  chatSend?.addEventListener("click", send);

  chatInput?.addEventListener("keydown", e => {
    if (e.key === "Enter") send();
  });

  messagesRef?.on?.("child_added", snap => {

    const d = snap.val();

    const p = document.createElement("p");

    p.innerHTML =
      `<span style="color:${d.color}">
        ${d.user}
      </span>: ${d.text}`;

    chatBox.appendChild(p);

    chatBox.scrollTop = chatBox.scrollHeight;

  });

  usersRef?.on?.("value", snap => {

    const users = snap.val() || {};

    userBar.innerText =
      "online: " +
      Object.values(users).map(u => u.name).join(", ");

  });

  let typingTimeout;

  chatInput?.addEventListener("input", () => {

    typingRef.set(username);

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      typingRef.remove();
    }, 800);

  });

  typingRef?.on?.("value", snap => {

    const v = snap.val();

    typing.innerText = v ? `${v} is typing...` : "";

  });

})();
