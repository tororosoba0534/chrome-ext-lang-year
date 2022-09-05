let rootElm = document.getElementById("rcnt");

let contentElm = document.createElement("div");
contentElm.id = "ExtremeSearchRoot";

let EOne = document.createElement("button");
let EAll = document.createElement("button");
let JOne = document.createElement("button");
let JAll = document.createElement("button");

EOne.id = "ExtremeSearch-EOne";
EAll.id = "ExtremeSearch-EAll";
JOne.id = "ExtremeSearch-JOne";
JAll.id = "ExtremeSearch-JAll";

EOne.innerText = "EOne";
EAll.innerText = "EAll";
JOne.innerText = "JOne";
JAll.innerText = "JAll";

contentElm.append(EOne, EAll, JOne, JAll);

rootElm.append(contentElm);
