const draggables =
document.querySelectorAll(".draggable");

draggables.forEach(windowEl => {

  const title =
  windowEl.querySelector(".titlebar");

  let isDragging = false;

  let offsetX = 0;
  let offsetY = 0;

  title.addEventListener("mousedown", e => {

    isDragging = true;

    offsetX =
      e.clientX -
      windowEl.offsetLeft;

    offsetY =
      e.clientY -
      windowEl.offsetTop;

  });

  document.addEventListener("mousemove", e => {

    if(!isDragging) return;

    windowEl.style.left =
      e.clientX - offsetX + "px";

    windowEl.style.top =
      e.clientY - offsetY + "px";

  });

  document.addEventListener("mouseup", () => {

    isDragging = false;

  });

});
