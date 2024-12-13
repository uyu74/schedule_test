"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      schedule: null
    };
  },
  methods: {},
  onLoad(options) {
    const scheduleName = decodeURIComponent(options.name);
    const storedSchedules = common_vendor.index.getStorageSync("schedules");
    if (storedSchedules) {
      this.schedules = JSON.parse(storedSchedules);
      this.schedule = this.schedules.find((schedule) => schedule.name === scheduleName);
    } else {
      console.log("未找到对应的课程表");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
