const fs = require("fs");
const ToObtainDom = require("./TooBtainDom");
const clickhandles = require("./clickHandle");
let canGoBack = false;
let canGoForward = false;
const getURL = require("./tools/getURL").getURL;

class Webview extends ToObtainDom {
  constructor(dom) {
    super();
    this.webview = document.querySelector(dom);
    this.currentUrl = null;
    this.homeUrl = null;
    this.canGoBack = false;
    this.canGoForward = false;
    this.init();
    this.setState();
  }
  bindUI() {
    this.clickHandles(clickhandles);
    this.searchInput.addEventListener("keypress", e => {
      var key = e.which || e.keyCode;
      if (key === 13) {
        console.log("导航");
        const value = this.searchInput.value;
        this.gonavigater(value);
      }
    });
    window.addEventListener("keydown", e => {
      var key = e.which || e.keyCode;
      if (key == 116) {
        this.webview.reload();
      }
    });
  }
  setState() {
    this.webview.addEventListener("dom-ready", () => {
      this.webviewFunctions();
      this.homeUrl = this.homeUrl || this.webview.getURL();
    });
    this.webview.addEventListener("did-navigate-in-page", () => {
      this.webviewFunctions();
    });

    this.webview.addEventListener("new-window", e => {
      const protocol = require("url").parse(e.url).protocol;
      if (protocol === "http:" || protocol === "https:") {
        webview.loadURL(e.url);
      }
    });
    this.webview.addEventListener("did-finish-load", e => {
      const currentUrl = this.webview.getURL();
      this.searchInput.value = currentUrl;
      this.currentUrl = currentUrl;
      this.webviewFunctions();
    });
  }
  // 设置导航栏样式
  webviewFunctions() {
    this.canGoBack = this.webview.canGoBack();
    this.canGoForward = this.webview.canGoForward();
    const styleName = "forbadeClick";
    const back = this.back;
    const goForward = this.forward;
    // 能返回
    if (this.canGoBack) {
      back.classList.remove(styleName);
    } else {
      back.classList.add(styleName);
    }
    // 能前进
    if (this.canGoForward) {
      forward.classList.remove(styleName);
    } else {
      forward.classList.add(styleName);
    }
  }
  gonavigater(src) {
    const url = getURL(src);
    this.webview.loadURL(url);
  }
  clearCache() {
    const cookies = this.webview.getWebContents().session.cookies;
    cookies.get({ url: this.currentUrl }, (error, cookie) => {
      cookie.map(item => {
        cookies.remove(this.currentUrl, item.name, error => {
          console.log(error);
        });
      });
    });
  }
}
const myWebview = new Webview("#foo");
// 设置导航栏样式
// function webviewFunctions() {
//   const styleName = "forbadeClick";
//   canGoBack = this.webview.canGoBack();
//   canGoForward = this.webview.canGoForward();
//   // 能返回
//   if (canGoBack) {
//     $$("#back").classList.remove(styleName);
//   } else {
//     $$("#back").classList.add(styleName);
//   }
//   // 能前进
//   if (canGoForward) {
//     $$("#forward").classList.remove(styleName);
//   } else {
//     $$("#forward").classList.add(styleName);
//   }
// }
