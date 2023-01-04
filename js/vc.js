var NewScript = document.createElement("script");
var head = document.getElementsByTagName("head")[0];
NewScript.type = "text/javascript";
NewScript.src = "https://unpkg.com/vconsole@latest/dist/vconsole.min.js"; // vConsole 地址
head.appendChild(NewScript);
var vConsole = new window.VConsole();