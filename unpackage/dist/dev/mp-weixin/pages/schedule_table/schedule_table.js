"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      schedules: this.getSchedulesFromStorage(),
      // 获取存储中的课程数据
      scheduleOnShow: ""
    };
  },
  onLoad() {
  },
  methods: {
    // 获取并解析存储的数据
    getSchedulesFromStorage() {
      try {
        const schedules = common_vendor.index.getStorageSync("schedules");
        return schedules ? JSON.parse(schedules) : [];
      } catch (e) {
        console.error("Error parsing schedules from storage:", e);
        return [];
      }
    },
    showDrawer(e) {
      this.$refs[e].open();
    },
    closeDrawer(e) {
      this.$refs[e].close();
    },
    change(e, type) {
      console.log((type === "showLeft" ? "左" : "右") + "侧栏状态：" + (e ? "显示" : "收起"));
    },
    onNavigationBarButtonTap(e) {
      if (this.showLeft) {
        this.$refs.showLeft.close();
      } else {
        this.$refs.showLeft.open();
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  _easycom_uni_drawer2();
}
const _easycom_uni_drawer = () => "../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
if (!Math) {
  _easycom_uni_drawer();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.showDrawer("showLeft")),
    b: common_vendor.o(($event) => $options.closeDrawer("showLeft")),
    c: common_vendor.sr("showLeft", "0a28a204-0"),
    d: common_vendor.o(($event) => $options.change($event, "showLeft")),
    e: common_vendor.p({
      mode: "left",
      width: 320
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
