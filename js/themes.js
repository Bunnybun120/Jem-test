function setTheme(theme){

const bg =
document.getElementById(
"themeBackground"
);

bg.innerHTML = "";

document.getElementById(
"themeStylesheet"
).href =
`themes/${theme}.css`;

if(theme === "vaporwave"){

bg.innerHTML = `

<div class="vapor-stars"></div>
<div class="vapor-sun"></div>
<div class="vapor-city"></div>
<div class="vapor-grid"></div>
<div class="vapor-fog"></div>
<div class="vapor-vhs"></div>

`;

}

if(theme === "aero"){

bg.innerHTML = `

<div class="aero-clouds"></div>
<div class="aero-water"></div>
<div class="aero-bubbles"></div>
<div class="aero-light"></div>

`;

}

if(theme === "rosalina"){

bg.innerHTML = `

<div class="rosa-nebula"></div>
<div class="rosa-stars"></div>
<div class="rosa-sparkles"></div>
<div class="rosa-fog"></div>

`;

}

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
) || "vaporwave";

setTheme(savedTheme);
