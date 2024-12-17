"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      schedules: null,
      // 存储所有的课表
      selectedSchedules: []
      // 存储选中的课表的索引
    };
  },
  methods: {
    // 删除选中的课表
    deleteSchedules() {
      if (this.selectedSchedules.length === 0) {
        common_vendor.index.redirectTo({
          url: "/pages/schedule_list/schedule_list"
        });
        common_vendor.index.showToast({
          title: "没有删除任何课程表",
          icon: "none"
        });
        return;
      }
      const selectedScheduleNames = this.selectedSchedules.map((index) => this.schedules[index].name);
      this.schedules = this.schedules.filter((schedule, index) => !this.selectedSchedules.includes(index));
      common_vendor.index.setStorageSync("schedules", JSON.stringify(this.schedules));
      common_vendor.index.showToast({
        title: `已删除课表：${selectedScheduleNames.join("，")}`,
        icon: "success"
      });
      this.selectedSchedules = [];
      common_vendor.index.navigateTo({
        url: "/pages/schedule_list/schedule_list"
      });
    },
    // 选中变化时的回调
    selectionChange(e) {
      this.selectedSchedules = e.detail.index;
      console.log("选中的课表", this.selectedSchedules);
    }
  },
  // 页面加载时获取存储的课表数据
  onLoad(options) {
    const storedSchedules = common_vendor.index.getStorageSync("schedules");
    if (storedSchedules) {
      this.schedules = JSON.parse(storedSchedules);
      console.log("找到对应的课表列表", this.schedules);
    } else {
      console.log("未找到对应的课表列表");
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
    a: $data.schedules
  }, $data.schedules ? {
    b: common_vendor.p({
      width: "150",
      align: "center"
    }),
    c: common_vendor.f($data.schedules, (schedule, index, i0) => {
      return {
        a: common_vendor.t(schedule.name),
        b: "37e04cdc-4-" + i0 + "," + ("37e04cdc-3-" + i0),
        c: index,
        d: "37e04cdc-3-" + i0 + ",37e04cdc-0"
      };
    }),
    d: common_vendor.sr("table", "37e04cdc-0"),
    e: common_vendor.o($options.selectionChange),
    f: common_vendor.p({
      border: true,
      stripe: true,
      type: "selection",
      emptyText: "暂无更多数据"
    })
  } : {}, {
    g: common_vendor.o((...args) => $options.deleteSchedules && $options.deleteSchedules(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
