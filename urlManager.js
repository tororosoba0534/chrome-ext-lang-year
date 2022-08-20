// https://www.google.com/search?q=%E3%82%AF%E3%83%AD%E3%82%B9%E8%A1%A8&oq=&aqs=chrome.1.35i39i362l8.76163j0j1&sourceid=chrome&ie=UTF-8
export const urlManager = {
  isGoogle: function (url) {
    return /https?:\/\/www\.google\.com\/search/.test(url);
  },
};
