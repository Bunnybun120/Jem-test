function setTheme(theme){

document.getElementById(
"themeStylesheet"
).href =

`themes/${theme}.css`;

localStorage.setItem(
"theme",
theme
);

}

window.addEventListener(
"load",
()=>{

const savedTheme =
localStorage.getItem(
"theme"
);

if(savedTheme){

document.getElementById(
"themeStylesheet"
).href =

`themes/${savedTheme}.css`;

}

});
