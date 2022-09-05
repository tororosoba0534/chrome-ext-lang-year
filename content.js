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

EOne.addEventListener("click", async () => {
  await changeStatusIfDiff(true, true);
});

EAll.addEventListener("click", async () => {
  await changeStatusIfDiff(true, false);
});

JOne.addEventListener("click", async () => {
  await changeStatusIfDiff(false, true);
});

JAll.addEventListener("click", async () => {
  await changeStatusIfDiff(false, false);
});

contentElm.append(EOne, EAll, JOne, JAll);

rootElm.append(contentElm);

const changeStatusIfDiff = async (isEn, isOne) => {
  const { isEn: isEnStored, isOne: isOneStored } =
    await chrome.storage.sync.get(["isEn", "isOne"]);

  if (isEn !== isEnStored || isOne !== isOneStored) {
    await chrome.storage.sync.set({ isEn, isOne });
  }
};
