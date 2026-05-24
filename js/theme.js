window.addEventListener(
"DOMContentLoaded",
() => {

const buttons =

document.querySelectorAll(
"[data-theme]"
);

const stylesheet =

document.getElementById(
"themeStylesheet"
);

function applyTheme(theme){

document.body.className = "";

document.body.classList.add(
`theme-${theme}`
);

stylesheet.href =
`themes/${theme}.css`;

localStorage.setItem(
"theme",
theme
);

}

buttons.forEach(button => {

button.addEventListener(
"click",
() => {

applyTheme(
button.dataset.theme
);

}
);

});

const savedTheme =

localStorage.getItem(
"theme"
)

||

"rosalina";

applyTheme(savedTheme);

}
);
