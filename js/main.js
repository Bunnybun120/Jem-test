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
