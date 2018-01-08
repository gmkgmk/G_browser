/*
 * @Author: guo.mk   
 * @Date: 2017-12-20 11:19:29 
 * @Last Modified by: guo.mk
 * @Last Modified time: 2018-01-05 16:53:51
 */
const { app, BrowserWindow, webContents } = require("electron");
const path = require("path");
const url = require("url");
const log = require("electron-log");

const isShouldUpdate = require("./updateManager");
let version = app.getVersion() || "1.0.0";
let appName = app.getName();
let win;

// 生成右键菜单
  
log.info("app is running");

//-------------------------------------------------------------------
//初始化窗口;
//-------------------------------------------------------------------
function createDefaultWindow() {
  let windowConfig = {
    title: appName,
    width: 1559, 
    height: 860, 
    frame: false, 
    enableLargerThanScreen: true  
  }; 
  win = new BrowserWindow(windowConfig);  
  win.webContents.openDevTools(); 
  
  // win.loadURL(  
  //   `file://${process.cwd()}/src/renderer/index.html#v${app.getVersion()}`
  // ); //ffi
  let url = require("url").format({
    protocol: "file",
    slashes: true,
    pathname: require("path").join(__dirname, "..", "/renderer", "index.html")
  });

  win.loadURL(url);

  win.on("closed", () => {
    win = null;
  });
  win.once("ready-to-show", () => {
    win.show();
  });
  return win;
}
app.on("ready", function() {
  const mainWindow = createDefaultWindow();
  const page = mainWindow.webContents;
  page.on("dom-ready", () => {
    // isShouldUpdate();
    console.log("页面加载完成");    
  });  
  mainWindow.on("resize", () => {
    const [width, height] = win.getContentSize();  
    for (let wc of webContents.getAllWebContents()) { 
      // Check if `wc` belongs to a webview in the `win` window.
      if (wc.hostWebContents && wc.hostWebContents.id === win.webContents.id) {
        wc.setSize({
          normal: { 
            width: width,
            height: height
          } 
        });
      }
    }
  }); 
});

app.on("window-all-closed", () => {
  app.quit();
});
  