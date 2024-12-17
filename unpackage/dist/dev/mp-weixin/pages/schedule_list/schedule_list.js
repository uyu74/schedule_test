"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      schedules: this.getSchedulesFromStorage()
      // 获取存储中的课程数据
    };
  },
  methods: {
    toDeleteSchedule() {
      common_vendor.index.redirectTo({
        url: "/pages/delete_schedule/delete_schedule"
      });
    },
    backToScheduleTable() {
      common_vendor.index.switchTab({
        url: "/pages/schedule_table/schedule_table"
        // success: (res) => {},
        // fail: (res) => {},
        // complete: (res) => {},
      });
    },
    newSchedule() {
      common_vendor.index.redirectTo({
        url: "/pages/add_schedule/add_schedule"
      });
    },
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
    // 处理课程详情页跳转
    goToScheduleDetail(schedule) {
      const encodedName = encodeURIComponent(schedule.name);
      common_vendor.index.navigateTo({
        url: `/pages/schedule_detail/schedule_detail?name=${encodedName}`
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_section2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "课程表列表"
    }),
    b: common_vendor.f($data.schedules, (schedule, index, i0) => {
      return {
        a: index,
        b: common_vendor.o(($event) => $options.goToScheduleDetail(schedule), index),
        c: "71c7243e-2-" + i0 + ",71c7243e-1",
        d: common_vendor.p({
          title: schedule.name,
          clickable: true
        })
      };
    }),
    c: common_vendor.o((...args) => $options.newSchedule && $options.newSchedule(...args)),
    d: common_vendor.o((...args) => $options.backToScheduleTable && $options.backToScheduleTable(...args)),
    e: common_vendor.o((...args) => $options.toDeleteSchedule && $options.toDeleteSchedule(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-71c7243e"]]);
wx.createPage(MiniProgramPage);
