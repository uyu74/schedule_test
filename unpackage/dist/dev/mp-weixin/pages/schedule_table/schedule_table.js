"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      schedules: [],
      // 获取存储中的课程数据
      scheduleOnShow: ""
      // 存储要展示的课程表
    };
  },
  onLoad() {
    this.getSchedulesFromStorage();
  },
  methods: {
    // 点击某个课程表时，将该课程表设置为要展示的课程表
    changeScheduleOnShow(schedule) {
      console.log("原先的课程表：", this.scheduleOnShow);
      this.scheduleOnShow = schedule;
      console.log("选中的课程表:", this.scheduleOnShow);
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
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_drawer2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_drawer = () => "../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_drawer)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.showDrawer("showLeft")),
    b: common_vendor.f($data.schedules, (schedule, index, i0) => {
      return {
        a: index,
        b: common_vendor.o(($event) => $options.changeScheduleOnShow(schedule), index),
        c: "0a28a204-2-" + i0 + ",0a28a204-1",
        d: common_vendor.p({
          title: schedule.name,
          clickable: true
        })
      };
    }),
    c: common_vendor.o(($event) => $options.closeDrawer("showLeft")),
    d: common_vendor.sr("showLeft", "0a28a204-0"),
    e: common_vendor.o(($event) => $options.change($event, "showLeft")),
    f: common_vendor.p({
      mode: "left",
      width: 320
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
