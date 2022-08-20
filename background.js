// // background.js
// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     files: ["content.js"],
//   });
// });

// import { urlManager } from "./urlManager";

chrome.action.onClicked.addListner((tab) => {
  //   alert(urlManager.isGoogle(tab.url) ? "YES!" : "NO...");
  //   alert("Hello, world!");
});
