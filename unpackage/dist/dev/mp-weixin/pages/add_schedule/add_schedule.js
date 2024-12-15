"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      schedules: this.getSchedulesFromStorage(),
      // 获取存储中的课程数据
      baseFormData: {
        name: "",
        date: this.getTodayDate()
      },
      rules: {
        name: {
          rules: [{ required: true, errorMessage: "请输入课表名称" }]
        },
        date: {
          rules: [{
            required: true,
            errorMessage: "请选择日期"
          }, {
            validateFunction: function(rule, value, data, callback) {
              const dayOfWeek = new Date(value).getDay();
              console.log(dayOfWeek);
              if (dayOfWeek !== 1) {
                callback("请选择一个周一");
              }
              return true;
            }
          }]
        }
      }
    };
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  methods: {
    backToScheduleDetail() {
      common_vendor.index.navigateTo({
        url: "/pages/schedule_detail/schedule_detail"
      });
    },
    change(e) {
      console.log(e);
    },
    submit(form) {
      console.log(this.baseFormData.name);
      console.log(this.baseFormData.date);
      this.$refs.form.validate().then((res) => {
        console.log("表单数据信息：", res);
        const newSchedule = {
          name: this.baseFormData.name,
          date: this.baseFormData.date,
          course: []
          // 空的课程数组
        };
        this.schedules.push(newSchedule);
        common_vendor.index.setStorageSync("schedules", JSON.stringify(this.schedules));
        console.log(this.baseFormData.name);
        common_vendor.index.navigateTo({
          url: "/pages/schedule_detail/schedule_detail?name=" + encodeURIComponent(this.baseFormData.name)
        });
      }).catch((err) => {
        console.log("表单错误信息：", err);
        return;
      });
    },
    // 从本地存储中获取课程数据
    getSchedulesFromStorage() {
      try {
        const schedules = common_vendor.index.getStorageSync("schedules");
        return schedules ? JSON.parse(schedules) : [];
      } catch (e) {
        console.error("Error parsing schedules from storage:", e);
        return [];
      }
    },
    // 获取今天的日期 (YYYY-MM-DD 格式)
    getTodayDate() {
      const today = /* @__PURE__ */ new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    getTodayDate() {
      const today = /* @__PURE__ */ new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    change(e) {
      console.log(this.baseFormData.name);
      console.log(this.baseFormData.date);
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_datetime_picker2 + _easycom_uni_card2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_datetime_picker + _easycom_uni_card + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.change),
    b: common_vendor.o(($event) => $data.baseFormData.name = $event),
    c: common_vendor.p({
      placeholder: "请输入课表名称",
      modelValue: $data.baseFormData.name
    }),
    d: common_vendor.p({
      label: "课表名称",
      name: "name"
    }),
    e: common_vendor.o($options.change),
    f: common_vendor.o(($event) => $data.baseFormData.date = $event),
    g: common_vendor.p({
      type: "date",
      ["return-type"]: "date",
      modelValue: $data.baseFormData.date
    }),
    h: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    i: common_vendor.p({
      label: "日期时间",
      name: "date"
    }),
    j: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    k: common_vendor.o((...args) => $options.backToScheduleDetail && $options.backToScheduleDetail(...args)),
    l: common_vendor.sr("form", "3a511f24-0"),
    m: common_vendor.p({
      model: $data.baseFormData,
      labelWidth: "80px",
      rules: $data.rules
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
