/**
 * 获取DOM与绑定事件
 *
 * @class ToObtainDom
 */
class ToObtainDom {
  constructor() {
    this.controller = this.$$("#controller");
    this.back = this.$$("#back");
    this.forward = this.$$("#forward");
    this.refresh = this.$$("#refresh");
    this.home = this.$$("#home");
    this.goUrl = this.$$("#goUrl");
    this.clearHistory = this.$$("#clearHistory");
    this.openDevTools = this.$$("#openDevTools");
    this.printPDF = this.$$("#printPDF");
    this.searchInput = this.$$("#searchInput");
  }
  init() {
    this.bindUI();
  }
  $$(dom) {
    if (typeof dom !== "string") {
      throw Error("dom must be a string");
    }
    const $$dom = document.querySelector(dom);
    return $$dom;
  }
  clickHandles(handlerMap, eventType = "click") {
    const that = this;
    this.controller.addEventListener(eventType, function(e) {
      handlerMap.map(item => {
        let el = e.target;
        const { name, fn, selector = "#" } = item;
        // 循环获取到对印的选择器,直到找不到或者找到了委托的容器
        while (el.matches && !el.matches(`${selector}${name}`)) {
          if (this === el) {
            el = null;
            break;
          }
          el = el.parentNode;
        }
        if (el && el.id === name) {
          fn.call(el, that, e);
        }
      });
    });
  }
  bindUI() {}
}

module.exports = ToObtainDom;
