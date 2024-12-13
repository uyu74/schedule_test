"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      value: "",
      // 输入框的值
      schedules: this.getSchedulesFromStorage()
      // 获取存储中的课程数据
    };
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
    // 处理课程详情页跳转
    goToScheduleDetail(schedule) {
      const encodedName = encodeURIComponent(schedule.name);
      common_vendor.index.navigateTo({
        url: `/pages/schedule_detail/schedule_detail?name=${encodedName}`
      });
    },
    // 提交对话框输入
    dialogInputConfirm(name) {
      common_vendor.index.showLoading({ title: "创建中..." });
      const newSchedule = {
        name,
        course: []
        // 空的课程数组
      };
      this.schedules.push(newSchedule);
      common_vendor.index.setStorageSync("schedules", JSON.stringify(this.schedules));
      this.closeDialog();
      common_vendor.index.hideLoading();
      this.goToScheduleDetail(newSchedule);
    },
    // 打开输入框对话框
    inputDialogToggle() {
      this.value = "";
      this.$refs.inputDialog.open();
    },
    // 关闭对话框
    dialogInputClose() {
      this.closeDialog();
    },
    // 关闭输入对话框
    closeDialog() {
      this.$refs.inputDialog.close();
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_section2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "课程表列表"
    }),
    b: common_vendor.f($data.schedules, (schedule, index, i0) => {
      return {
        a: index,
        b: common_vendor.o(($event) => $options.goToScheduleDetail($data.schedules[index]), index),
        c: "71c7243e-2-" + i0 + ",71c7243e-1",
        d: common_vendor.p({
          title: $data.schedules[index].name,
          clickable: true
        })
      };
    }),
    c: common_vendor.o((...args) => $options.inputDialogToggle && $options.inputDialogToggle(...args)),
    d: common_vendor.sr("inputClose", "71c7243e-4,71c7243e-3"),
    e: common_vendor.o($options.dialogInputConfirm),
    f: common_vendor.o($options.dialogInputClose),
    g: common_vendor.p({
      mode: "input",
      title: "输入标题",
      value: " ",
      placeholder: "请输入内容",
      ["before-close"]: "true"
    }),
    h: common_vendor.sr("inputDialog", "71c7243e-3"),
    i: common_vendor.p({
      type: "dialog"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-71c7243e"]]);
wx.createPage(MiniProgramPage);
