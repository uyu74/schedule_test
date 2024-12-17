"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      schedule: null,
      selectedCourses: []
    };
  },
  methods: {
    deleteCourses() {
      if (this.selectedCourses.length === 0) {
        common_vendor.index.showToast({
          title: "未删除任何课程",
          icon: "none"
        });
        common_vendor.index.redirectTo({
          url: "/pages/schedule_detail/schedule_detail?name=" + encodeURIComponent(this.schedule.name)
        });
        return;
      }
      if (this.schedule.course.length === 0) {
        common_vendor.index.redirectTo({
          url: "/pages/schedule_detail/schedule_detail?name=" + encodeURIComponent(this.schedule.name)
        });
      }
      const selectedCourseNames = this.selectedCourses.map((index) => this.schedule.course[index].name);
      const remainingCourses = this.schedule.course.filter((course, index) => !this.selectedCourses.includes(index));
      this.schedule.course = remainingCourses;
      const storedSchedules = common_vendor.index.getStorageSync("schedules");
      if (storedSchedules) {
        const schedules = JSON.parse(storedSchedules);
        const updatedSchedules = schedules.map(
          (item) => item.name === this.schedule.name ? this.schedule : item
        );
        common_vendor.index.setStorageSync("schedules", JSON.stringify(updatedSchedules));
      }
      common_vendor.index.showToast({
        title: `已删除课程：${selectedCourseNames.join("，")}`,
        icon: "success"
      });
      this.selectedCourses = [];
      common_vendor.index.redirectTo({
        url: "/pages/schedule_detail/schedule_detail?name=" + encodeURIComponent(this.schedule.name)
      });
    },
    selectionChange(e) {
      this.selectedCourses = e.detail.index;
      console.log("选中的课程", this.selectedCourses);
    }
  },
  onLoad(options) {
    const scheduleName = decodeURIComponent(options.name);
    const storedSchedules = common_vendor.index.getStorageSync("schedules");
    if (storedSchedules) {
      const schedules = JSON.parse(storedSchedules);
      this.schedule = schedules.find((schedule) => schedule.name === scheduleName);
      console.log("找到对应的课程表", this.schedule);
    } else {
      console.log("未找到对应的课程表");
    }
  }
};
if (!Array) {
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  (_easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2)();
}
const _easycom_uni_th = () => "../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../uni_modules/uni-table/components/uni-table/uni-table.js";
if (!Math) {
  (_easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.schedule
  }, $data.schedule ? {
    b: common_vendor.p({
      width: "150",
      align: "center"
    }),
    c: common_vendor.f($data.schedule.course, (course, index, i0) => {
      return {
        a: common_vendor.t(course.name),
        b: "53012a31-4-" + i0 + "," + ("53012a31-3-" + i0),
        c: index,
        d: "53012a31-3-" + i0 + ",53012a31-0"
      };
    }),
    d: common_vendor.sr("table", "53012a31-0"),
    e: common_vendor.o($options.selectionChange),
    f: common_vendor.p({
      border: true,
      stripe: true,
      type: "selection",
      emptyText: "暂无更多数据"
    })
  } : {}, {
    g: common_vendor.o((...args) => $options.deleteCourses && $options.deleteCourses(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-53012a31"]]);
wx.createPage(MiniProgramPage);
