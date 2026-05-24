function setTheme(theme){

document.body.className = "";

document.body.classList.add(
`theme-${theme}`
);

localStorage.setItem(
"theme",
theme
);

const stylesheet =

document.getElementById(
"themeStylesheet"
);

stylesheet.href =
`themes/${theme}.css`;

}

const savedTheme =

localStorage.getItem(
"theme"
)

||

"vaporwave";

setTheme(savedTheme);
