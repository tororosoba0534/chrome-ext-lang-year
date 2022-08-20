const btnEn1 = document.getElementById("en-1");
const btnEnWhole = document.getElementById("en-whole");
const btnJa1 = document.getElementById("ja-1");
const btnJaWhole = document.getElementById("ja-whole");

btnEn1.addEventListener("click", async () => {
  await clickBtn(true, true);
});

btnEnWhole.addEventListener("click", async () => {
  await clickBtn(true, false);
});

btnJa1.addEventListener("click", async () => {
  await clickBtn(false, true);
});

btnJaWhole.addEventListener("click", async () => {
  await clickBtn(false, false);
});

const clickBtn = async (isEn, isOne) => {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  //   if (!/https?:\/\/www\.google\.com\/search/.test(tab.url)) return;

  const newUrl = updateUrl(tab.url, isEn, isOne);

  await chrome.tabs.update(tab.id, {
    url: newUrl,
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: updateTab,
    // args: [tab.id, newUrl],
    args: [tab.id, newUrl],
  });

  //   chrome.tabs.update(
  //     tab.id,
  //     "https://www.tohoho-web.com/ex/chrome_extension.html"
  //   );
};

const updateTab = (tabId, url) => {
  //   alert(/https?:\/\/www\.google\.com\/search/.test(url) ? "Google!!" : "NO...");
  //   alert(`newUrl: ${url}`);
  //   chrome.tabs.update(tabId, {
  //     url: "https://www.tohoho-web.com/ex/chrome_extension.html",
  //   });
};

const updateUrl = (url, isEn, isOne) => {
  let newUrl = url;
  if (isEn) {
    newUrl = newUrl + "&lr=-lang_ja";
  } else {
    newUrl = newUrl.replace(/&lr=-lang_ja/g, "");
    newUrl = newUrl.replace(/&hl=en/g, "");
  }

  if (isOne) {
    newUrl = newUrl + "&tbs=qdr:y";
  } else {
    newUrl = newUrl.replace(/&as_qdr=y1/g, "");
    newUrl = newUrl.replace(/&tbs=qdr:y/g, "");
  }
  return newUrl;
};
