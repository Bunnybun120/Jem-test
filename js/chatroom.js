const chatMessages =

document.getElementById(
"chatMessages"
);

function sendMessage(){

const input =

document.getElementById(
"chatInput"
);

const text = input.value.trim();

if(text === "") return;

const message =

document.createElement(
"div"
);

message.className =
"message self";

message.innerHTML =

`
<div class="bubble">

<h4>

Bunny

</h4>

<p>

${text}

</p>

</div>
`;

chatMessages.appendChild(
message
);

chatMessages.scrollTop =
chatMessages.scrollHeight;

input.value = "";

fakeReply();

}

/* ===================================== */
/* FAKE REPLIES */
/* ===================================== */

function fakeReply(){

const replies = [

"real",
"this site atmosphere is insane",
"vaporwave theme goes hard",
"why are we all awake rn",
"i need more music recs",
"late-night internet energy >>>"

];

const names = [

"starboy99",
"pixelheart",
"dreaming.exe"

];

const pfps = [

"assets/pfps/user1.gif",
"assets/pfps/user2.gif",
"assets/pfps/user3.gif"

];

const randomReply =

replies[
Math.floor(
Math.random() * replies.length
)
];

const randomName =

names[
Math.floor(
Math.random() * names.length
)
];

const randomPfp =

pfps[
Math.floor(
Math.random() * pfps.length
)
];

setTimeout(() => {

const reply =

document.createElement(
"div"
);

reply.className =
"message other";

reply.innerHTML =

`
<img src="${randomPfp}">

<div class="bubble">

<h4>

${randomName}

</h4>

<p>

${randomReply}

</p>

</div>
`;

chatMessages.appendChild(
reply
);

chatMessages.scrollTop =
chatMessages.scrollHeight;

}, 1400);

}

/* ===================================== */
/* CLEAR CHAT */
/* ===================================== */

function clearChat(){

chatMessages.innerHTML = "";

}

/* ===================================== */
/* ARCHIVE */
/* ===================================== */

function archiveChat(){

const messages =

chatMessages.innerText;

localStorage.setItem(
"chatArchive",
messages
);

alert(
"Chat archived."
);

}
