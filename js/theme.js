const buttons =

document.querySelectorAll(
"[data-theme]"
);

buttons.forEach(button => {

button.addEventListener(
"click",
() => {

const theme =
button.dataset.theme;

document.body.className =
`theme-${theme}`;

document.getElementById(
"themeStylesheet"
).href =
`themes/${theme}.css`;

localStorage.setItem(
"theme",
theme
);

}
);

});

window.addEventListener(
"DOMContentLoaded",
() => {

const savedTheme =

localStorage.getItem(
"theme"
)

||

"rosalina";

document.body.className =
`theme-${savedTheme}`;

document.getElementById(
"themeStylesheet"
).href =
`themes/${savedTheme}.css`;

}
);
