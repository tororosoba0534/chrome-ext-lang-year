chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.sync.set({ isEn: false, isOne: false });
  console.log("onInstalled event fired!");
});

chrome.storage.onChanged.addListener(async (changes, areaName) => {
  console.log(`changes: ${JSON.stringify(changes)}, areaName: ${areaName}`);

  const { isEn, isOne } = await chrome.storage.sync.get(["isEn", "isOne"]);

  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  if (!/https?:\/\/www\.google\.com\/search/.test(tab.url)) return;

  await chrome.tabs.update(tab.id, {
    url: updateUrl(tab.url, isEn, isOne),
  });
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  //   console.log(`changeInfo: ${JSON.stringify(changeInfo)}`);

  //   const queryOptions = { active: true, lastFocusedWindow: true };
  //   const [tab] = await chrome.tabs.query(queryOptions);

  if (changeInfo?.status !== "loading") return;
  //   console.log(`changeInfo: ${JSON.stringify(changeInfo)}`);

  console.log(`tab.url: ${tab.url}`);
  if (!/https?:\/\/www\.google\.com\/search/.test(tab.url)) return;

  const { isEn, isOne } = await chrome.storage.sync.get(["isEn", "isOne"]);

  console.log(`isEn: ${isEn}, isOne: ${isOne}`);

  if (!isUrlMatchStatus(tab.url, isEn, isOne)) {
    await chrome.tabs.update(tab.id, { url: updateUrl(tab.url, isEn, isOne) });
  }
});

const isUrlMatchStatus = (url, isEn, isOne) => {
  if (isEn) {
    if (!/&lr=-lang_ja/.test(url)) return false;
  } else {
    if (/&lr=-lang_ja/.test(url) || /&hl=en/.test(url)) return false;
  }

  if (isOne) {
    if (!/&tbs=qdr:y/.test(url)) return false;
  } else {
    if (/&tbs=qdr:y/.test(url) || /&as_qdr=y1/.test(url)) return false;
  }

  return true;
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
