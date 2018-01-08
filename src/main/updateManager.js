const { autoUpdater } = require("electron-updater");
const { updatePath } = require("../config/configs.json");
const { app, dialog } = require("electron");
const fetch = require("electron-fetch");
let version = app.getVersion() || "1.0.0";

//-------------------------------------------------------------------
//更新函数;
//updateWithAuto自动更新；
//@url String 请求更新的地址
//updateWIthHandle手动更新
//-------------------------------------------------------------------

function updateWithAuto(url) {
  console.log("update url ", url);
  let message = {
    error: "检查更新出错",
    checking: "正在检查更新……",
    updateAva: "可升级到新版本",
    updateNotAva: "现在使用的就是最新版本，不用更新",
    updateDownloaded: "更新完成，请重新启动已完成更新"
  };
  autoUpdater.setFeedURL(url);
  // autoUpdater.autoDownload = false; //是否自动下载；
  // let isUpdatePromise = autoUpdater.checkForUpdates(); //检查是否有更新
  autoUpdater.on("checking-for-update", () => {
    sendStatusToWindow({
      status: 1,
      msg: message.checking
    });
  });
  autoUpdater.on("update-available", info => {
    sendStatusToWindow({
      status: 2,
      msg: message.updateAva
    });
  });
  autoUpdater.on("update-not-available", info => {
    sendStatusToWindow({
      status: 3,
      msg: message.updateNotAva
    });
  });
  autoUpdater.on("error", err => {
    sendStatusToWindow({
      status: 0,
      msg: message.error + err
    });
  });
  autoUpdater.on("download-progress", progressObj => {
    let log_message = parseInt(progressObj.percent) + "%";
    sendStatusToWindow({
      status: 4,
      msg: log_message,
      obj: progressObj
    });
  });
  autoUpdater.on("update-downloaded", info => {
    sendStatusToWindow({
      status: 5,
      msg: message.updateDownloaded,
      obj: info
    });
    var index = dialog.showMessageBox(mainWindow, {
      type: "info",
      buttons: ["现在重启", "稍后重启"],
      title: appName,
      detail: "有新版本，是否现在重启？"
    });
    if (index === 1) return;
    autoUpdater.quitAndInstall(true, true);
  });
  autoUpdater.checkForUpdatesAndNotify();
}
function isShouldUpdate() {
  const getNewVersion = `${updatePath}/bdp-api/app/getAppNewVersion?`;
  fetch(`${getNewVersion}`)
    .then(res => res.json())
    .then(res => {
      let { code, urlList } = res;
      if (code == 100 && urlList && urlList.length) {
        //去除给的文件名，留下文件路劲
        let paths = urlList[0].split("/");
        if (urlList[0].includes(".exe") || urlList[0].includes(".yml")) {
          paths.pop();
        }
        let urlPaths = paths.join("/");
        updateWithAuto(urlPaths);
      } else {
        dialog.showMessageBox(mainWindow, {
          type: "info",
          title: appName,
          detail: "获取更新错误" + code
        });
      }
    });
}

module.exports = isShouldUpdate;
