const btnEn1 = document.getElementById("en-1");
const btnEnWhole = document.getElementById("en-whole");
const btnJa1 = document.getElementById("ja-1");
const btnJaWhole = document.getElementById("ja-whole");

btnEn1.addEventListener("click", async () => {
  await changeStatusIfDiff(true, true);
});

btnEnWhole.addEventListener("click", async () => {
  await changeStatusIfDiff(true, false);
});

btnJa1.addEventListener("click", async () => {
  await changeStatusIfDiff(false, true);
});

btnJaWhole.addEventListener("click", async () => {
  await changeStatusIfDiff(false, false);
});

const changeStatusIfDiff = async (isEn, isOne) => {
  const { isEn: isEnStored, isOne: isOneStored } =
    await chrome.storage.sync.get(["isEn", "isOne"]);

  if (isEn !== isEnStored || isOne !== isOneStored) {
    await chrome.storage.sync.set({ isEn, isOne });
  }
};
