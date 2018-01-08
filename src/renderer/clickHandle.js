const handlerMap = [
  {
    name: "goUrl",
    fn: function(obServer) {
      console.log("导航");
      const value = obServer.searchInput.value;
      obServer.gonavigater(value);
    }
  },
  {
    name: "refresh",
    fn: function(obServer) {
      console.log("刷新");
      obServer.webview.reload();
    }
  },
  {
    name: "forward",
    fn: function(obServer) {
      if (obServer.canGoForward) {
        console.log("前进");
        obServer.webview.goForward();
      }
    }
  },
  {
    name: "back",
    fn: function(obServer) {
      if (obServer.canGoBack) {
        console.log("后退");
        obServer.webview.goBack();
      }
    }
  },
  {
    name: "home",
    fn: function(obServer) {
      obServer.webview.loadURL(obServer.homeUrl);
    }
  },
  {
    name: "clearHistory",
    fn: function(obServer) {
      console.log("清除导航历史");
      obServer.webview.clearHistory();
      obServer.webviewFunctions();
    }
  },
  {
    name: "openDevTools",
    fn: function(obServer) {
      console.log("打开调试窗口");
      obServer.webview.openDevTools();
    }
  },
  {
    name: "printPDF",
    fn: function(obServer) {
      console.log("打印PDF");
      obServer.webview.printToPDF({}, (error, data) => {
        if (error) throw error;
        fs.writeFile("./print.pdf", data, error => {
          if (error) throw error;
          console.log("Write PDF successfully.");
        });
      });
    }
  },
  {
    name: "clearCachae",
    fn: function(obServer) {
      console.log(obServer);
      obServer.clearCache();
    }
  }
];
module.exports = handlerMap;
