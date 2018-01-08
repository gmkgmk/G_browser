let redirectIndex = Math.floor(Math.random() * 1000);

function getURL(path, host = "http://") {
  console.log(host, path);
  let url;

  path = path || "";

  if (path.match(/^http[s]?:\/\//i)) {
    url = path;
  } else {
    let subPath = path.replace(/^\//, "");
    let newHost = host.replace(/\/$/, "");
    url = `${newHost}/${subPath}`;
  }

  return url.trim();
}

function getNoCacheURL(url) {
  url = url.trim();
  var newUrl;
  let p = `_x_${redirectIndex++}_o_`;
  if (url.match(/\?/)) {
    newUrl = url.replace(/_x_(\d+)_o_/, "").replace(/\?/, `?${p}&`);
  } else {
    newUrl = `${url}?${p}`;
  }
  newUrl = newUrl.replace("&&", `&`);
  return newUrl;
}
module.exports = {
  getNoCacheURL,
  getURL
};
