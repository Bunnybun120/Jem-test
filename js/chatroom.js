const sendButton =

document.getElementById(
"sendMessage"
);

const clearButton =

document.getElementById(
"clearChat"
);

const archiveButton =

document.getElementById(
"archiveChat"
);

const messages =

document.getElementById(
"messages"
);

sendButton.addEventListener(
"click",
() => {

const input =

document.getElementById(
"messageInput"
);

const status =

document.getElementById(
"statusSelect"
).value;

if(!input.value) return;

const div =
document.createElement("div");

div.classList.add(
"message"
);

div.innerHTML =

`
<span class="user">
Bunny (${status}):
</span>

${input.value}
`;

messages.appendChild(div);

input.value = "";

}
);

clearButton.addEventListener(
"click",
() => {

messages.innerHTML = "";

}
);

archiveButton.addEventListener(
"click",
() => {

localStorage.setItem(
"chatArchive",
messages.innerHTML
);

alert(
"Chat archived."
);

}
);

window.addEventListener(
"DOMContentLoaded",
() => {

const archive =

localStorage.getItem(
"chatArchive"
);

if(archive){

messages.innerHTML = archive;

}

}
);
