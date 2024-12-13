"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      schedule: null
    };
  },
  methods: {
    addNewCourse() {
      common_vendor.index.navigateTo({
        url: "/pages/add_course/add_course?name=" + encodeURIComponent(this.schedule.name)
      });
    }
  },
  onLoad(options) {
    const scheduleName = decodeURIComponent(options.name);
    const storedSchedules = common_vendor.index.getStorageSync("schedules");
    if (storedSchedules) {
      this.schedules = JSON.parse(storedSchedules);
      this.schedule = this.schedules.find((schedule) => schedule.name === scheduleName);
      console.log("找到对应的课程表", this.schedule);
    } else {
      console.log("未找到对应的课程表");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.schedule
  }, $data.schedule ? {
    b: common_vendor.t($data.schedule.name),
    c: common_vendor.t($data.schedule.course.length),
    d: common_vendor.f($data.schedule.course, (course, index, i0) => {
      return {
        a: common_vendor.t(course.name),
        b: common_vendor.t(course.room),
        c: common_vendor.t(course.teacher),
        d: common_vendor.t(course.weekDay),
        e: common_vendor.t(course.classTime),
        f: common_vendor.t(course.week.join(", ")),
        g: index
      };
    })
  } : {}, {
    e: common_vendor.o((...args) => $options.addNewCourse && $options.addNewCourse(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fde52a37"]]);
wx.createPage(MiniProgramPage);