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

localStorage.setItem(
"selectedTheme",
theme
);

}

const savedTheme =
localStorage.getItem(
"selectedTheme"
) || "vaporwave";

setTheme(savedTheme);
