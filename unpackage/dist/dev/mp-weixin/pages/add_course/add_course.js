"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      scheduleName: "",
      // 课程表名称
      courseData: {
        name: "",
        room: "",
        teacher: "",
        weekDay: 1,
        // 星期几上课
        classTime: 1,
        // 一天的第几节课
        week: []
        // 周范围
      },
      weekDayRange: [
        { value: "1", text: "星期一" },
        { value: "2", text: "星期二" },
        { value: "3", text: "星期三" },
        { value: "4", text: "星期四" },
        { value: "5", text: "星期五" },
        { value: "6", text: "星期六" },
        { value: "7", text: "星期日" }
      ],
      classTimeRange: [
        { value: "1", text: "一" },
        { value: "2", text: "二" },
        { value: "3", text: "三" },
        { value: "4", text: "四" },
        { value: "5", text: "五" }
      ],
      weekRange: [
        { value: "1", text: "第一周" },
        { value: "2", text: "第二周" },
        { value: "3", text: "第三周" },
        { value: "4", text: "第四周" },
        { value: "5", text: "第五周" },
        { value: "6", text: "第六周" },
        { value: "7", text: "第七周" },
        { value: "8", text: "第八周" },
        { value: "9", text: "第九周" },
        { value: "10", text: "第十周" },
        { value: "11", text: "第十一周" },
        { value: "12", text: "第十二周" },
        { value: "13", text: "第十三周" },
        { value: "14", text: "第十四周" },
        { value: "15", text: "第十五周" },
        { value: "16", text: "第十六周" },
        { value: "17", text: "第十七周" },
        { value: "18", text: "第十八周" },
        { value: "19", text: "第十九周" },
        { value: "20", text: "第二十周" }
      ],
      // 表单验证规则
      rules: {
        name: {
          rules: [{ required: true, errorMessage: "请输入课程名称" }]
        },
        room: {
          rules: [{ required: true, errorMessage: "请输入上课地点" }]
        },
        teacher: {
          rules: [{ required: true, errorMessage: "请输入教师名称" }]
        },
        weekDay: {
          rules: [{ required: true, errorMessage: "请选择星期几" }]
        },
        classTime: {
          rules: [{ required: true, errorMessage: "请选择第几节课" }]
        },
        week: {
          rules: [{ required: true, errorMessage: "请选择周范围" }]
        }
      }
    };
  },
  onLoad(options) {
    this.scheduleName = decodeURIComponent(options.name);
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  methods: {
    backToScheduleDetail() {
      common_vendor.index.navigateTo({
        url: "/pages/schedule_detail/schedule_detail?name=" + encodeURIComponent(this.scheduleName)
      });
    },
    // 提交表单
    submit(form) {
      this.$refs.form.validate().then((res) => {
        console.log("提交的课程数据：", this.courseData);
        const storedSchedules = common_vendor.index.getStorageSync("schedules");
        if (storedSchedules) {
          const schedules = JSON.parse(storedSchedules);
          const schedule = schedules.find((schedule2) => schedule2.name === this.scheduleName);
          if (schedule) {
            schedule.course.push(this.courseData);
            schedule.course.sort((a, b) => {
              if (a.weekDay === b.weekDay) {
                return a.classTime - b.classTime;
              }
              return a.weekDay - b.weekDay;
            });
            common_vendor.index.setStorageSync("schedules", JSON.stringify(schedules));
          }
        }
        common_vendor.index.redirectTo({
          url: "/pages/schedule_detail/schedule_detail?name=" + encodeURIComponent(this.scheduleName)
        });
      }).catch((err) => {
        console.log("表单错误信息：", err);
      });
    },
    // 选择单周
    selectOddWeeks() {
      this.courseData.week = this.weekRange.filter((week) => week.value % 2 !== 0).map((week) => week.value);
    },
    // 选择双周
    selectEvenWeeks() {
      this.courseData.week = this.weekRange.filter((week) => week.value % 2 === 0).map((week) => week.value);
    },
    // 全选
    selectAllWeeks() {
      this.courseData.week = this.weekRange.map((week) => week.value);
    },
    change(e) {
      console.log("星期几：", this.courseData.weekDay);
      console.log("第几节课：", this.courseData.classTime);
      console.log("周范围：", this.courseData.week);
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.courseData.name = $event),
    b: common_vendor.p({
      placeholder: "请输入课程名称",
      modelValue: $data.courseData.name
    }),
    c: common_vendor.p({
      label: "课程名称",
      name: "name"
    }),
    d: common_vendor.o(($event) => $data.courseData.room = $event),
    e: common_vendor.p({
      placeholder: "请输入上课地点",
      modelValue: $data.courseData.room
    }),
    f: common_vendor.p({
      label: "上课地点",
      name: "room"
    }),
    g: common_vendor.o(($event) => $data.courseData.teacher = $event),
    h: common_vendor.p({
      placeholder: "请输入教师姓名",
      modelValue: $data.courseData.teacher
    }),
    i: common_vendor.p({
      label: "教师姓名",
      name: "teacher"
    }),
    j: common_vendor.o($options.change),
    k: common_vendor.o(($event) => $data.courseData.weekDay = $event),
    l: common_vendor.p({
      localdata: $data.weekDayRange,
      modelValue: $data.courseData.weekDay
    }),
    m: common_vendor.p({
      label: "星期几",
      name: "weekDay"
    }),
    n: common_vendor.o($options.change),
    o: common_vendor.o(($event) => $data.courseData.classTime = $event),
    p: common_vendor.p({
      localdata: $data.classTimeRange,
      modelValue: $data.courseData.classTime
    }),
    q: common_vendor.p({
      label: "第几节课",
      name: "classTime"
    }),
    r: common_vendor.o($options.change),
    s: common_vendor.o(($event) => $data.courseData.week = $event),
    t: common_vendor.p({
      multiple: true,
      localdata: $data.weekRange,
      modelValue: $data.courseData.week
    }),
    v: common_vendor.p({
      label: "周范围",
      name: "week"
    }),
    w: common_vendor.o((...args) => $options.selectOddWeeks && $options.selectOddWeeks(...args)),
    x: common_vendor.o((...args) => $options.selectEvenWeeks && $options.selectEvenWeeks(...args)),
    y: common_vendor.o((...args) => $options.selectAllWeeks && $options.selectAllWeeks(...args)),
    z: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    A: common_vendor.o((...args) => $options.backToScheduleDetail && $options.backToScheduleDetail(...args)),
    B: common_vendor.sr("form", "41df242a-0"),
    C: common_vendor.p({
      modelValue: $data.courseData,
      ["label-width"]: "80px",
      rules: $data.rules
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-41df242a"]]);
wx.createPage(MiniProgramPage);
