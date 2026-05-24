/* =========================================
THEME SYSTEM
========================================= */

function setTheme(theme){

const bg =
document.getElementById(
"themeBackground"
);

/* CLEAR OLD LAYERS */

bg.innerHTML = "";

/* LOAD CSS FILE */

document.getElementById(
"themeStylesheet"
).href =
`themes/${theme}.css`;

/* =========================================
VAPORWAVE
========================================= */

if(theme === "vaporwave"){

document.body.style.fontFamily =
"'Orbitron', sans-serif";

bg.innerHTML = `

<div class="vapor-stars"></div>

<div class="vapor-sun"></div>

<div class="vapor-grid"></div>

<div class="vapor-fog"></div>

<div class="vapor-vhs"></div>

<div class="vapor-palms"></div>

`;
/* =========================================
AERO
========================================= */

if(theme === "aero"){

document.body.style.fontFamily =
"'Nunito', sans-serif";

bg.innerHTML = `

<div class="aero-clouds"></div>

<div class="aero-light"></div>

<div class="aero-bubbles"></div>

`;

}

/* =========================================
ROSALINA
========================================= */

if(theme === "rosalina"){

document.body.style.fontFamily =
"'VT323', monospace";

bg.innerHTML = `

<div class="rosa-nebula"></div>

<div class="rosa-stars"></div>

<div class="rosa-sparkles"></div>

`;

}

/* SAVE THEME */

localStorage.setItem(
"selectedTheme",
theme
);

}

/* =========================================
LOAD SAVED THEME
========================================= */

const savedTheme =

localStorage.getItem(
"selectedTheme"
)

||

"vaporwave";

setTheme(savedTheme);
