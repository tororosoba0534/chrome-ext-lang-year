const btnEn1 = document.getElementById("en-1");
const btnEnWhole = document.getElementById("en-whole");
const btnJa1 = document.getElementById("ja-1");
const btnJaWhole = document.getElementById("ja-whole");

btnEn1.addEventListener("click", async () => {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: showAlert,
    args: [tab.url],
  });
});

const showAlert = (url) => {
  alert(url);
};
