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
  await chrome.storage.sync.set({ isEn, isOne });

  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  await chrome.tabs.update(tab.id, {
    url: updateUrl(tab.url, isEn, isOne),
  });
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
