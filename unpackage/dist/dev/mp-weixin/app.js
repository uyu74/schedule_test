"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/schedule_table/schedule_table.js";
  "./pages/schedule_list/schedule_list.js";
  "./pages/add_course/add_course.js";
  "./pages/schedule_detail/schedule_detail.js";
  "./pages/add_schedule/add_schedule.js";
  "./pages/delete_course/delete_course.js";
  "./pages/delete_schedule/delete_schedule.js";
  "./pages/todo/todo.js";
  "./pages/todo_settings/todo_settings.js";
  "./pages/obtain_todo_infromation/obtain_todo_infromation.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
