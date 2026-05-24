function setTheme(theme){

document.body.className = "";

document.body.classList.add(
`theme-${theme}`
);

localStorage.setItem(
"theme",
theme
);

document
.getElementById(
"themeStylesheet"
)
.href =
`themes/${theme}.css`;

}

const savedTheme =

localStorage.getItem(
"theme"
)

||

"rosalina";

setTheme(savedTheme);
