console.log("JEM.EXE loaded ✦");

/* DRAG WINDOWS */
document.querySelectorAll(".window").forEach(win => {

  const bar = win.querySelector(".titlebar");

  if (!bar) return;

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  bar.addEventListener("mousedown", (e) => {
    dragging = true;

    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;

    win.style.zIndex = 9999;
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

/* DRAG ICONS */
document.querySelectorAll(".desktop-icon").forEach(icon => {

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  icon.addEventListener("mousedown", (e) => {
    dragging = true;

    offsetX = e.clientX - icon.offsetLeft;
    offsetY = e.clientY - icon.offsetTop;

    icon.style.zIndex = 9999;
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

/* CLICK EFFECT */
document.addEventListener("click", (e) => {

  const dot = document.createElement("div");

  dot.style.position = "absolute";
  dot.style.left = e.pageX + "px";
  dot.style.top = e.pageY + "px";
  dot.style.width = "8px";
  dot.style.height = "8px";
  dot.style.borderRadius = "50%";
  dot.style.background = "hotpink";
  dot.style.pointerEvents = "none";

  document.body.appendChild(dot);

  setTimeout(() => dot.remove(), 500);
});
