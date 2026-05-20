document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     DRAG SYSTEM (PC ONLY SAFE)
  ========================= */

  document.querySelectorAll(".draggable").forEach(win => {

    const bar = win.querySelector(".titlebar");
    if (!bar) return;

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    bar.addEventListener("mousedown", e => {

      // disable on mobile touch devices
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
     DROPDOWNS (FIXED RELIABILITY)
  ========================= */

  document.querySelectorAll(".category-header").forEach(header => {

    header.addEventListener("click", () => {

      const content = header.nextElementSibling;

      if (!content || !content.classList.contains("category-content")) return;

      const isOpen = content.style.display === "block";

      content.style.display = isOpen ? "none" : "block";

    });

  });

  /* =========================
     STATUS TOGGLE (ABOUT PAGE)
  ========================= */

  const status = document.getElementById("statusPanel");

  if (status) {

    let state = 0;

    status.addEventListener("click", () => {

      state++;

      const states = [
        "STATUS :: ONLINE ✦",
        "STATUS :: IDLE",
        "STATUS :: FOCUSED",
        "STATUS :: OVERLOADED"
      ];

      status.innerText = states[state % states.length];

    });

  }

  /* =========================
     TYPEWRITER EFFECT
  ========================= */

  const typeLine = document.getElementById("typeLine");

  if (typeLine) {

    const text = "booting profile system...";

    let i = 0;

    const type = () => {

      if (i < text.length) {
        typeLine.innerHTML += text[i];
        i++;
        setTimeout(type, 35);
      }

    };

    type();

  }

  /* =========================
     LOGO ROTATOR
  ========================= */

  const logo = document.querySelector(".logo");

  if (logo) {

    const messages = [
      "JEM.EXE",
      "currently yapping...",
      "emotionally online...",
      "hyperfixating...",
      "music brain activated"
    ];

    setInterval(() => {

      logo.innerText =
        "✦ " +
        messages[Math.floor(Math.random() * messages.length)] +
        " ✦";

    }, 5000);

  }

  /* =========================
     SPARKLE TRAIL (SAFE CLEANUP)
  ========================= */

  document.addEventListener("mousemove", e => {

    const sparkle = document.createElement("div");

    sparkle.className = "sparkle";

    sparkle.style.left = e.pageX + "px";
    sparkle.style.top = e.pageY + "px";

    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 500);

  });

});
const firebaseConfig = {
  apiKey: "AIzaSyAQkx8r6WwtLAjFfFSmlGEOTcCFvWb7hWI",
  authDomain: "chatroom-39c7a.firebaseapp.com",
  databaseURL: "https://chatroom-39c7a-default-rtdb.firebaseio.com",
  projectId: "chatroom-39c7a",
  storageBucket: "chatroom-39c7a.firebasestorage.app",
  messagingSenderId: "590743257861",
  appId: "1:590743257861:web:e386928c084ba704ca2d6c"
};

/* INIT */
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/* PATHS */
const messagesRef = db.ref("chat/messages");
const usersRef = db.ref("chat/users");
const typingRef = db.ref("chat/typing");

/* ELEMENTS */
const loginBox = document.getElementById("loginBox");
const chatSystem = document.getElementById("chatSystem");

const nameInput = document.getElementById("nameInput");
const joinBtn = document.getElementById("joinBtn");

const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");

const typing = document.getElementById("typing");
const userBar = document.getElementById("userBar");

/* USER DATA */
let username = "";
let userColor = "";

/* COLORS */
function getColor() {
  const colors = [
    "#ff69b4",
    "#00ffff",
    "#8a2be2",
    "#7fff00",
    "#ffcc00"
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}

/* JOIN SYSTEM */
joinBtn?.addEventListener("click", () => {

  username = nameInput.value.trim();
  if (!username) return;

  userColor = getColor();

  loginBox.style.display = "none";
  chatSystem.style.display = "block";

  usersRef.push({
    name: username,
    time: Date.now()
  });

});

/* SEND MESSAGE */
function sendMessage() {

  const msg = chatInput.value.trim();
  if (!msg || !username) return;

  messagesRef.push({
    user: username,
    text: msg,
    color: userColor,
    time: Date.now()
  });

  chatInput.value = "";
}

chatSend?.addEventListener("click", sendMessage);

chatInput?.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

/* RECEIVE MESSAGES */
messagesRef.on("child_added", snap => {

  const data = snap.val();

  const p = document.createElement("p");

  p.innerHTML =
    `<span style="color:${data.color}">
      ${data.user}
    </span>: ${data.text}`;

  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;

});

/* TYPING INDICATOR */
let typingTimeout;

chatInput?.addEventListener("input", () => {

  typingRef.set(username);

  clearTimeout(typingTimeout);

  typingTimeout = setTimeout(() => {
    typingRef.remove();
  }, 800);

});

typingRef.on("value", snap => {

  const val = snap.val();

  typing.innerText = val
    ? `${val} is typing...`
    : "";

});

/* ONLINE USERS */
usersRef.on("value", snap => {

  const users = snap.val() || {};

  userBar.innerText =
    "online: " +
    Object.values(users)
      .map(u => u.name)
      .join(", ");

});
