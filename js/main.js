console.log("JEM.EXE fully loaded ✦");

/* =========================
   DRAGGABLE WINDOWS
========================= */

const windows = document.querySelectorAll(".window");

windows.forEach(win => {
  const bar = win.querySelector(".titlebar");

  if (!bar) return;

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  bar.addEventListener("mousedown", (e) => {
    dragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = 999;
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    win.style.left = (e.clientX - offsetX) + "px";
    win.style.top = (e.clientY - offsetY) + "px";
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
  });
});


/* =========================
   DRAGGABLE DESKTOP ICONS
========================= */

const icons = document.querySelectorAll(".desktop-icon");

icons.forEach(icon => {

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  icon.addEventListener("mousedown", (e) => {
    dragging = true;

    offsetX = e.clientX - icon.offsetLeft;
    offsetY = e.clientY - icon.offsetTop;

    icon.style.zIndex = 999;
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    icon.style.left = (e.clientX - offsetX) + "px";
    icon.style.top = (e.clientY - offsetY) + "px";
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
  });

});


/* =========================
   MOBILE MENU TOGGLE
========================= */

const toggle = document.getElementById("mobile-toggle");
const nav = document.querySelector(".nav-links");

if (toggle) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}


/* =========================
   CLICK EFFECT SPARKLES
========================= */

document.addEventListener("click", (e) => {
  const spark = document.createElement("div");

  spark.style.position = "absolute";
  spark.style.left = e.pageX + "px";
  spark.style.top = e.pageY + "px";
  spark.style.width = "10px";
  spark.style.height = "10px";
  spark.style.borderRadius = "50%";
  spark.style.background = "hotpink";
  spark.style.boxShadow = "0 0 10px hotpink";
  spark.style.pointerEvents = "none";

  document.body.appendChild(spark);

  setTimeout(() => spark.remove(), 500);
});
