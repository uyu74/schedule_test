"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      schedules: [],
      // 获取存储中的课程数据
      scheduleOnShow: "",
      // 存储要展示的课程表
      weeklySchedule: [],
      // 存储每周的课程表
      weeklyDate: [],
      currentWeek: 1,
      // 当前周数
      pageSize: 20,
      total: 400
    };
  },
  onLoad() {
    this.getSchedulesFromStorage();
    this.getCurrentWeek();
  },
  methods: {
    weekChange(e) {
      this.$refs.table.clearSelection();
      console.log("当前页:", e.current);
      this.currentWeek = e.current;
    },
    // 从本地存储中获取课程表数据
    getSchedulesFromStorage() {
      const schedules = common_vendor.index.getStorageSync("schedules");
      if (schedules) {
        this.schedules = schedules;
        this.scheduleOnShow = this.schedules[0];
        this.preprocessWeeklySchedule();
      }
    },
    // 切换要展示的课程表
    getCurrentWeek() {
      const now = /* @__PURE__ */ new Date();
      const startDate = new Date(this.scheduleOnShow.date);
      if (startDate.getDay() !== 1) {
        console.error("请确保选择的日期是周一");
        return;
      } else {
        console.log("选择的日期是周一");
      }
      const diff = now - startDate;
      const days = diff / (1e3 * 60 * 60 * 24);
      this.currentWeek = Math.ceil(days / 7);
      console.log("当前周数：", this.currentWeek);
    },
    // 管理多课程表
    manageSchedules() {
      common_vendor.index.navigateTo({
        url: "/pages/schedule_list/schedule_list"
      });
    },
    // 初始化每周课程表
    initializeWeeklySchedule() {
      this.weeklySchedule = new Array(20).fill(null).map(
        () => new Array(5).fill(null).map(
          () => (
            // 一天五节课
            new Array(7).fill(null)
          )
          // 周一到周天
        )
      );
      this.weeklyDate = new Array(20).fill(null).map(() => new Array(7).fill(null));
      const startDate = new Date(this.scheduleOnShow.date);
      startDate.setHours(0, 0, 0, 0);
      this.weeklyDate.forEach((week, weekIndex) => {
        week.forEach((dat, datIndex) => {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + weekIndex * 7 + datIndex);
          this.weeklyDate[weekIndex][datIndex] = (currentDate.getMonth() + 1).toString().padStart(2, "0") + "-" + currentDate.getDate().toString().padStart(2, "0");
        });
      });
    },
    // 预处理每周课程表
    preprocessWeeklySchedule() {
      this.initializeWeeklySchedule();
      this.getCurrentWeek();
      this.scheduleOnShow.course.forEach((course) => {
        course.week.forEach((week) => {
          this.weeklySchedule[week - 1][course.classTime - 1][course.weekDay - 1] = course;
        });
      });
      console.log("课程日期:", this.weeklyDate);
      console.log("每周课程表:", this.weeklySchedule);
    },
    getDayOfWeek(dayIndex) {
      const days = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
      return days[dayIndex - 1];
    },
    // 点击某个课程表时，将该课程表设置为要展示的课程表
    changeScheduleOnShow(schedule) {
      console.log("原先的课程表：", this.scheduleOnShow);
      this.scheduleOnShow = schedule;
      console.log("选中的课程表:", this.scheduleOnShow);
      this.preprocessWeeklySchedule();
      console.log("每周课程表:", this.weeklySchedule);
    },
    // 获取并解析存储的数据，并找出索引最小的课程表
    getSchedulesFromStorage() {
      try {
        const schedules = common_vendor.index.getStorageSync("schedules");
        if (schedules) {
          this.schedules = JSON.parse(schedules);
          if (this.schedules.length > 0) {
            this.scheduleOnShow = this.schedules.reduce((min, schedule) => {
              return schedule.index < min.index ? schedule : min;
            });
            this.preprocessWeeklySchedule();
            console.log("选中的课程表:", this.scheduleOnShow);
          }
        } else {
          console.log("未找到课程数据");
        }
      } catch (e) {
        console.error("Error parsing schedules from storage:", e);
        this.schedules = [];
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
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_drawer2 + _easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2 + _easycom_uni_pagination2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_drawer = () => "../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
const _easycom_uni_th = () => "../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../uni_modules/uni-table/components/uni-table/uni-table.js";
const _easycom_uni_pagination = () => "../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_drawer + _easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table + _easycom_uni_pagination)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.schedules, (schedule, index, i0) => {
      return {
        a: index,
        b: common_vendor.o(($event) => $options.changeScheduleOnShow(schedule), index),
        c: "1cfc69c8-2-" + i0 + ",1cfc69c8-1",
        d: common_vendor.p({
          title: schedule.name,
          clickable: true
        })
      };
    }),
    b: common_vendor.o(($event) => $options.closeDrawer("showLeft")),
    c: common_vendor.o((...args) => $options.manageSchedules && $options.manageSchedules(...args)),
    d: common_vendor.sr("showLeft", "1cfc69c8-0"),
    e: common_vendor.o(($event) => $options.change($event, "showLeft")),
    f: common_vendor.p({
      mode: "left",
      width: 320
    }),
    g: common_vendor.p({
      width: "20",
      align: "center"
    }),
    h: common_vendor.f($data.weeklyDate[$data.currentWeek - 1], (day, index, i0) => {
      return {
        a: common_vendor.t($options.getDayOfWeek(index + 1)),
        b: common_vendor.t(day),
        c: index,
        d: "1cfc69c8-6-" + i0 + ",1cfc69c8-4"
      };
    }),
    i: common_vendor.p({
      align: "center",
      width: "60"
    }),
    j: common_vendor.f($data.weeklySchedule[$data.currentWeek - 1], (row, rowindex, i0) => {
      return {
        a: common_vendor.t(rowindex + 1),
        b: "1cfc69c8-8-" + i0 + "," + ("1cfc69c8-7-" + i0),
        c: common_vendor.f(row, (day, colIndex, i1) => {
          return common_vendor.e({
            a: day
          }, day ? {
            b: common_vendor.t(day.name),
            c: common_vendor.t(day.room),
            d: common_vendor.t(day.teacher)
          } : {}, {
            e: colIndex,
            f: "1cfc69c8-9-" + i0 + "-" + i1 + "," + ("1cfc69c8-7-" + i0)
          });
        }),
        d: rowindex,
        e: "1cfc69c8-7-" + i0 + ",1cfc69c8-3"
      };
    }),
    k: common_vendor.p({
      align: "center"
    }),
    l: common_vendor.p({
      align: "center"
    }),
    m: common_vendor.sr("table", "1cfc69c8-3"),
    n: common_vendor.p({
      loading: _ctx.loading,
      border: true,
      stripe: true,
      emptyText: "暂无更多数据"
    }),
    o: common_vendor.o($options.weekChange),
    p: common_vendor.p({
      ["show-icon"]: true,
      ["page-size"]: $data.pageSize,
      current: $data.currentWeek,
      total: $data.total
    }),
    q: common_vendor.o(($event) => $options.showDrawer("showLeft"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cfc69c8"]]);
wx.createPage(MiniProgramPage);
